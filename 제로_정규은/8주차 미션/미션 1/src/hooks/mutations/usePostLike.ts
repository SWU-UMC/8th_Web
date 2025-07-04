import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lpdetail";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDetailDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
    return useMutation({
        mutationFn: postLike,
        // onMutate -> API 요청 이전에 호출되는 친구
        onMutate: async (lp) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.lps, lp.lpId],
            });

            // 2. 현재 게시글의 데이터를 캐시에서 가져오기
            const prevLpPost = queryClient.getQueryData<ResponseLpDetailDto>([
                QUERY_KEY.lps, 
                lp.lpId
            ]);

         
            const newLpPost = {...prevLpPost};

            // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치 찾기
            const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
            const userId = Number(me?.data.id);

            const likedIndex = prevLpPost?.data.likes.findIndex(
                (like) => like.userId === userId,
            ) ?? -1;

            if (likedIndex>=0) {
                prevLpPost?.data.likes.splice(likedIndex, 1); // 내가 있는 위치를 찾아서 제거
            } else {
                const newLike = {userId, lpId: lp.lpId} as Likes;
                prevLpPost?.data.likes.push(newLike);
            }

            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

            return {prevLpPost, newLpPost};
        },

        onError: (error, newLp, context) => {
            console.log("error", error, newLp);
            queryClient.setQueryData(
                [QUERY_KEY.lps, newLp.lpId],
                context?.prevLpPost?.data.id,
            );
        },

        // 서버 동기화
        onSettled: (data, error, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables.lpId],
                exact: true,
            });
        },
    });
}

export default usePostLike;