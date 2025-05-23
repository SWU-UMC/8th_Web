// context/AuthContext.tsx
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { postLogout, postSignin } from "../apis/auth.ts";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signINData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
    setAccessToken: (token: string | null) => void;  // 추가된 부분
    setRefreshToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
    setAccessToken: () => {},  // 기본 값 추가
    setRefreshToken: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage() || null);
    const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage() || null);

    const login = async (signinData: RequestSigninDto) => {
        try {
            const { data } = await postSignin(signinData);

            if (data) {
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);

                alert("로그인 성공");
                window.location.href = "/"; // 로그인 후 리디렉션
            }
        } catch (error) {
            console.error("로그인 오류", error);
            alert("로그인 실패");
        }
    };

    const logout = async () => {
        try {
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);

            alert("로그아웃 성공");
        } catch (error) {
            console.error("로그아웃 오류", error);
            alert("로그아웃 실패");
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, setAccessToken, setRefreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }

    return context;
};
