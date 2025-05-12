import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    //data-> API 성공 응답데이터,
    //variables-> mutate에 전달한 값
    //context -> noMutate에서 반환한 값
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },
    //error -> 요청 실패시 발생한 에러
    //variables-> mutate에 전달한 값
    //context -> noMutate에서 반환한 값
    onError: (error, variables, context) => {},
    //요청 실행되기 직전에 실행되는 함수
    //Optimistic Update를 구현할 때 유용
    onMutate: (variables) => {
      console.log("hi");
    },
    //요청 끝난 후 항상 실행됨(OnSuccess, onError 후에 실행됨)
    //로딩 상태를 초기화할 때 조금 유용
    onSettled: (data, variables, context) => {},
  });
}

export default usePostLike;
