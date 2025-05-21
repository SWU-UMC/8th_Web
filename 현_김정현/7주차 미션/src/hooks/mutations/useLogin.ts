import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getMyInfo } from "../../apis/user";
import { postSignin } from "../../apis/auth";

export const useLogin = () => {
    const { setAccessToken, setRefreshToken, setUser } = useAuth();

    return useMutation({
    mutationFn: postSignin,
    onSuccess: async (response) => {
        const { accessToken, refreshToken } = response.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    
        const res = await getMyInfo();
        setUser(res.data);
    
        alert("로그인 성공");
        window.location.href = "/my";
    },
    onError: () => {
        alert("로그인 실패");
    },
    });
};
