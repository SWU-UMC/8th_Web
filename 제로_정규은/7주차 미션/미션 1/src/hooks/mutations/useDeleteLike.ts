import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp.ts";
import { Likes, RequestLpDto, ResponseLikeLpDto, ResponseLpDto } from "../../types/lp.ts";
import { queryClient } from "../../App.tsx";
import { ResponseMyInfoDto } from "../../types/auth.ts";
import { QUERY_KEY } from "../../constants/key.ts";


function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,

    // onMutate → 요청 전에 optimistic update
    onMutate: async ({ lpId }: RequestLpDto) => {
      // 1. 기존 요청 중단
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lps, lpId] });

      // 2. 이전 캐시 상태 저장
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([QUERY_KEY.lps, lpId]);

      // 3. 복사해서 newLpPost 만들기
      const newLpPost: ResponseLpDto | undefined = previousLpPost
        ? { ...previousLpPost, status: previousLpPost.status ?? false }
        : undefined;

      // 4. 현재 로그인한 사용자 정보
      const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);

      const userId: number = Number((me as ResponseMyInfoDto)?.data.id);

      // 5. 좋아요 배열에서 해당 userId의 위치 찾기
      const likedIndex: number =
        previousLpPost?.data.likes.findIndex((like: Likes) => like.userId === userId) ?? -1;

      // 6. 있으면 삭제, 없으면 추가 (토글 로직)
      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike: Likes = { userId, lpId: lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }
// 업데이트된 게시글 데이터를 캐시에 저장
queryClient.setQueryData([QUERY_KEY.lps, lpId], newLpPost);

return { previousLpPost, newLpPost };
},

onError: (
  error: Error,
  newLp: RequestLpDto,
  context: { previousLpPost: ResponseLpDto | undefined; newLpPost: ResponseLpDto | undefined } | undefined
) => {
  console.log(error, newLp);
  if (context?.previousLpPost) {
    queryClient.setQueryData(
      [QUERY_KEY.lps, newLp.lpId],
      context.previousLpPost
    );
  }
},

onSettled: async (
  data: ResponseLikeLpDto | undefined,
  error: Error | null,
  variables: RequestLpDto,
  context: { previousLpPost: ResponseLpDto | undefined; newLpPost: ResponseLpDto | undefined } | undefined
) => await queryClient.invalidateQueries({
  queryKey: [QUERY_KEY.lps, variables.lpId],
})
  });
}



export default useDeleteLike;