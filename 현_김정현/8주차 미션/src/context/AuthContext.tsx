import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { RequestSigninDto, ResponseMyInfoDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo, postLogout, postSignin } from "../apis/auth";

interface AuthContextType{
    accessToken: string | null;
    refreshToken: string | null;
    user: ResponseMyInfoDto["data"] | null;
    login: (signInData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
    setAccessToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
    setUser: (user: ResponseMyInfoDto["data"] | null) => void;
    removeAccessToken: () => void;
    removeRefreshToken: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    user: null,
    login: async() => {},
    logout: async() => {},
    setAccessToken: () => {},
    setRefreshToken: () => {},
    setUser: () => {},
    removeAccessToken: () => {},
    removeRefreshToken: () => {},
});

export const AuthProvider = ({children}:PropsWithChildren) => {
    const {getItem:getAccessTokenFromStorage, setItem:setAccessTokenInStorage, removeItem:removeAccessTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {getItem:getRefreshTokenFromStorage, setItem:setRefreshTokenInStorage,removeItem:removeRefreshTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage(),
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage(),
    );
    const [user, setUser] = useState<ResponseMyInfoDto["data"] | null>(null);

    const login = async (signInData:RequestSigninDto) => {
        try {
            const {data} = await postSignin(signInData);

            if (data) {
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);

                const res = await getMyInfo();
                setUser(res.data);

                alert("로그인 성공");
                window.location.href = "/my";
            }
        } catch (error) {
            console.error("로그인 오류", error);
            alert("로그인 실패");
        }
    };

    const logout = async() => {
        try {
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);

            setUser(null);
            alert("로그아웃 성공")
        } catch (error) {
            console.error("로그아웃 오류", error);
            alert("로그아웃 실패");
        }
    };

    // 새로고침해도 사용자 정보 유지 (accessToken이 있으면 가져옴)
    useEffect(() => {
        const fetchUser = async () => {
        if (accessToken && !user) {
            try {
            const res = await getMyInfo();
            setUser(res.data);
            } catch (err) {
            console.error("자동 로그인 중 사용자 정보 가져오기 실패", err);
            }
        }
        };
        fetchUser();
    }, [accessToken, user]);

    return (
        <AuthContext.Provider 
        value={{accessToken, refreshToken, user, login, logout, setAccessToken,
            setRefreshToken, setUser, removeAccessToken: removeAccessTokenFromStorage,
            removeRefreshToken: removeRefreshTokenFromStorage,}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error ("AuthContext를 찾을 수 없습니다.");
    }

    return context
}