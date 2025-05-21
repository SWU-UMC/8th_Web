import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

export const useLogout = () => {
    const { removeAccessToken, removeRefreshToken, setUser, setAccessToken, setRefreshToken } = useAuth();

    return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
        removeAccessToken();
        removeRefreshToken();
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        alert("로그아웃 성공");
    },
    onError: () => {
        alert("로그아웃 실패");
    },
    });
};