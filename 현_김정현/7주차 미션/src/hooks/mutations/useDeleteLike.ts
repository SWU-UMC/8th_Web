import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
    return useMutation({
        mutationFn: deleteLike,
        // onMutate -> API 요청 이전에 호출됨
        // 변경을 UI에 바로 보여주기 위해 Cache 업데이트
        onMutate: async(lp) => {
            // 1. 게시글에 관련된 쿼리를 취소 (캐시된 데이터를 새로 불러오는 요청)
            await queryClient.cancelQueries({
                queryKey:[QUERY_KEY.lps, lp.lpId],
            });
            // 2. 현재 게시글의 데이터를 캐시에서 가져오기
            const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
                QUERY_KEY.lps, lp.lpId
            ])
            // 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체 만들기
            // 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위함
            const newLpPost = {...previousLpPost};

            // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치 찾기
            const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
            
            const userId = Number(me?.data.id);
            const likedIndex = previousLpPost?.data.likes.findIndex(
                (like) => like.userId === userId) ??-1;
            if(likedIndex >= 0) {
                previousLpPost?.data.likes.splice(likedIndex, 1)
            }
            else {
                const newLike = {userId, lpId:lp.lpId} as Likes; 
                previousLpPost?.data.likes.push(newLike)
            }

            // 업데이트된 게시글 데이터를 캐시에 저장
            // -> UI가 바로 업데이트 됨
            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost)

            return {previousLpPost, newLpPost}
        },
        onError:(err, newLp, context) => {
            console.log(err, newLp);
            queryClient.setQueryData(
                [QUERY_KEY.lps, newLp.lpId],
            context?.previousLpPost?.data.id,
            )
        },
        // onSettled는 API 요청이 끝난 후 (성공 여부에 상관없이 실행)
        onSettled: async(data, error, variables, context) => {
            await queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lps, variables.lpId]
            })
        }
    })
}

export default useDeleteLike;