import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { postLp } from "../../apis/lp";
import { CreateLpDto, ResponseCreateLpDto } from "../../types/lp";

function usePostLp() {
  return useMutation<ResponseCreateLpDto, Error, CreateLpDto>({
    mutationFn: postLp,
    onSuccess: (data, variables) => {
      console.log("✅ LP 생성 성공:", data.data);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },
    onError: (error) => {
      console.error("❌ LP 생성 실패:", error.message);
    },
    onMutate: (variables) => {
      console.log("🌀 LP 생성 시도:", variables);
    },
    onSettled: () => {
      console.log("✅ LP 생성 완료");
    },
  });
}

export default usePostLp;
