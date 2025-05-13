// hooks/useLogout.ts
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { queryClient } from "../../App"; // queryClient 경로 확인 필요
import { QUERY_KEY } from "../../constants/key"; // 필요 시 사용

function useLogout() {
    return useMutation({
        mutationFn: postLogout,
        onSuccess: () => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.myInfo], // 예: 사용자 정보 쿼리
                exact: true,
            });
        },
        onError: (error) => {
            console.error("로그아웃 중 오류 발생:", error);
        },
    });
}

export default useLogout;
