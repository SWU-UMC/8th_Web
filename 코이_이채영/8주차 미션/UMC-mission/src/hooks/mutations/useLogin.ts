// hooks/mutations/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { useAuth } from "../../context/AuthContext";

function useLogin() {
    const { setAccessToken, setRefreshToken } = useAuth();

    return useMutation({
        mutationFn: postSignin,
        onSuccess: (data) => {
            const { accessToken, refreshToken } = data.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            // 인증 상태 갱신
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.user],
            });
        },
    });
}

export default useLogin;
