import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig{
    _retry? : boolean; //요청 재시도 여부를 나타내는 플래그
}

//전역변수로 refresh 요청의 promise를 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    withCredentials: true,
});

//요청 인터셉터: 모든 요청 전에 accesstoken을 authorization 헤더에 추가한다.
axiosInstance.interceptors.request.use(
    (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); //localstorage에서 accesstoken을 가져온다.

    //accesstoken이 존재하면 authorization 헤더에 bearer 토큰 형식으로 추가한다.
    if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    //수정도니 요청 설정을 반환한다.
    return config;
},
    //요청인터셉터가 실패하면 에러 뿜음
    (error) => Promise.reject(error),
);

//응답 인터셉터: 401에러발생 -> refresh 토큰을 통한 토큰 갱신을 처리한다.
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest: CustomInternalAxiosRequestConfig = error.config;
        
        //401 에러면서 아직 재시도 하지 않은 요청 경우 처리
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            //refresh 엔드포인트 401 에러가 발생한 경우 (unauthorized), 중복 재시도 방지를 위해 로그아웃 처리
            if (originalRequest.url === "/v1/auth/refresh") {
                const { removeItem: removeAccessToken } = useLocalStorage(
                    LOCAL_STORAGE_KEY.accessToken,
                );
                const { removeItem: removeRefreshtoken } = useLocalStorage(
                    LOCAL_STORAGE_KEY.refreshToken,
                );
                removeAccessToken();
                removeRefreshtoken();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (!refreshPromise) {
                refreshPromise = (async () => {
                    const { getItem: getRefreshToken } = useLocalStorage(
                        LOCAL_STORAGE_KEY.refreshToken,
                    );
                    const refreshToken = getRefreshToken();

                    const { data } = await axiosInstance.post("/v1/auth/refresh", {
                        refresh: refreshToken,
                    });

                    const { setItem: setAccessToken } = useLocalStorage(
                        LOCAL_STORAGE_KEY.accessToken,
                    );
                    const { setItem: setRefreshToken } = useLocalStorage(
                        LOCAL_STORAGE_KEY.refreshToken,
                    );
                    setAccessToken(data.data.accessToken);
                    setRefreshToken(data.data.refreshToken);

                    return data.data.accessToken;
                })()
                    .catch((error) => {
                        const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                        const { removeItem: removeRefreshtoken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

                        removeAccessToken();
                        removeRefreshtoken();
                    })
                    .finally(() => {
                        refreshPromise = null;
                    });
            }

            return refreshPromise.then((newAccesstoken) => {
                originalRequest.headers["Authorization"] = `Bearer ${newAccesstoken}`;
                return axiosInstance.request(originalRequest);
            });
        }
        //401에러가 아닌경우에 그대로 오류를 반환
        return Promise.reject(error);
    },
);