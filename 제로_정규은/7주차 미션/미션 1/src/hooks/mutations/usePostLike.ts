import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseLpDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";
import { Likes } from "../../types/lp";

function usePostLike(){
    return useMutation({
        mutationFn:postLike, 
        //UI에 바로 변경을 보여주기 위해 Cache 업데이트
        onMutate:async(lp)=>{
            //1. 이 게시글에 관련된 쿼리 취소 (캐시된 데이터를 새로 불러오는 요청)
            await queryClient.cancelQueries({
                queryKey:[QUERY_KEY.lps, lp.lpId]
            });
            //2. 현재 글의 데이터를 캐시에서 가져와야 함
            const previousLpPost = queryClient.getQueryData<ResponseLpDto>([QUERY_KEY.lps, lp.lpId]);
            if (!previousLpPost) return { previousLpPost: null, newLpPost: null };

            // 게시글의 데이터를 복사해 NewLpPost라는 새로운 객체를 만들 것임
            //복사하는 가장 큰 이유는 나중에 오류가 발생했을 때 이전 상태로 돌리기 위한 것
            const newLpPost = { ...previousLpPost };
            // 저장된 좋아요 목록에서 누른 좋아요 위치를 찾는다
            const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
            console.log(me?.data.id);
            const userId = Number(me?.data.id);

            const likedIndex = previousLpPost.data.likes.findIndex(
                (like)=>like.userId===userId,)??-1;

            if(likedIndex >=0){
                newLpPost.data.likes.splice(likedIndex, 1);
            } else{
                const newLike = {userId, lpId:lp.lpId} as Likes;
                newLpPost.data.likes.push(newLike);
            }
            //업뎃된 게시글 데이터를 캐시에 저장
            //이렇게 하면 UI가 바로 업데이트됨, 사용자가 변화를 확인할 수 있다
            queryClient.setQueryData([QUERY_KEY.lps,lp.lpId], newLpPost);

            return {previousLpPost, newLpPost};
        },
        onError:(err, newLp, context)=>{
            if (context?.previousLpPost) {
                queryClient.setQueryData(
                    [QUERY_KEY.lps, newLp.lpId],
                    context.previousLpPost
                );
            }
        },
        onSettled:async(data, error, variables) =>{
            await queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lps, variables.lpId],
            });
        },
    });
}

export default usePostLike;