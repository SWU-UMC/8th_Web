import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean; //요청 재시도 여부를 나타내는 플래그
}

// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지
let refreshPromise: Promise<string | null> | null = null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    
});

// 토큰 관련
// 요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); // localStorage에서 accessToken을 가져온다.

    if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    };

    //수정된 요청 설정 반환
    return config;
},
    // 요청 인터셉터 실패 시 에러
    (error) => Promise.reject(error),
);

// 응답 인터셉터: 401 에러 발생 -> refreshToken을 사용하여 accessToken을 갱신한다.
axiosInstance.interceptors.response.use(
    (response) => response, // 정상 응답 그대로 반환
    async(error) => {
        const originalRequest: CustomInternalAxiosRequestConfig = error.config;

        const { removeItem : removeAccessToken, setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const { 
            removeItem : removeRefreshToken, 
            setItem: setRefreshToken, 
            getItem : getRefreshToken 
        } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

        //401 에러면서, 아직 재시도 하지 않은 요청 경우 처리
        if(
            error.response && 
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            if (originalRequest.url === "/v1/auth/refresh") {
                removeAccessToken();
                removeRefreshToken();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            // 재시도 플래그 설정
            originalRequest._retry = true;

            if (!refreshPromise) {
                const refreshToken = getRefreshToken();
                refreshPromise = axiosInstance.post('/v1/auth/refresh', {
                    refresh: refreshToken,
                })
                .then(({ data }) => {
                    const {accessToken, refreshToken} = data.data;
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);

                    return accessToken;
                })
                .catch(() => {
                    removeAccessToken();
                    removeRefreshToken();
                    return null;
                })
                . finally(() => {
                    refreshPromise = null;
                });
            }

            return refreshPromise?.then((newAccessToken) => {
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance.request(originalRequest);
            });
        }
        //401 에러가 아닌 경우 그대로 오류 반환
        return Promise.reject(error);
    }
)