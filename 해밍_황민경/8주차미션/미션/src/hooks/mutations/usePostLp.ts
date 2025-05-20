import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { postLp } from "../../apis/lp";
import { CreateLpDto, ResponseCreateLpDto } from "../../types/lp";
import { queryClient } from "../../App";

function usePostLp(onClose: () => void) {
  return useMutation<ResponseCreateLpDto, Error, CreateLpDto>({
    mutationFn: postLp,
    onSuccess: (data, variables) => {
      console.log(" LP 생성 성공:", data.data);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
        exact: false,
      });
      onClose(); // 성공 시 모달 닫기
    },
    onError: (error) => {
      console.error(" LP 생성 실패:", error.message);
      alert("LP 생성 중 오류가 발생했어요.");
    },
    onMutate: (variables) => {
      console.log(" LP 생성 시도:", variables);
    },
    onSettled: () => {
      console.log(" LP 생성 완료");
    },
  });
}

export default usePostLp;
