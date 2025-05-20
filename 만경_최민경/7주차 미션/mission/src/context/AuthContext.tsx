import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getMyInfo, postLogout, postSignin } from "../apis/auth";
import { Navigate } from "react-router-dom";


interface AuthContextType{
    accessToken: string|null;
    refreshToken: string|null;
    login: (signInData: RequestSigninDto)=> Promise<void>;
    logout: ()=> Promise<void>;
    userName: string;
    setUserName: (name: string) => void;
}

export const AuthContext=createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async ()=> {},
    logout: async ()=> {},
    userName: "",               
    setUserName: () => {}, 
    
});

export const AuthProvider=({children}: PropsWithChildren)=> {
    
    const {
        setItem: setAccessTokenInStorage,
        getItem: getAccessTokenFromStorage,
        removeItem: removeAccessTokenFromStorage,
    }= useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    
    const {
        setItem: setRefreshTokenInStorage,
        getItem: getRefreshTokenFromStorage,
        removeItem: removeRefreshTokenFromStorage
    }= useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)

    const[accessToken,setAccessToken]=useState<string|null>(
        getAccessTokenFromStorage(), //지연초기화
    )
    const[refreshToken,setRefreshToken]=useState<string|null>(
        getRefreshTokenFromStorage(),
    )

    const [userName, setUserName] = useState<string>("");

    const login=async(signinData: RequestSigninDto)=>{
     try{
        const{data}=await postSignin(signinData) 

        if(data){
            const newAccessToken=data.accessToken;
            const newRefreshToken=data.refreshToken;

            setAccessTokenInStorage(newAccessToken);
            setRefreshTokenInStorage(newRefreshToken);

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
            
            alert("로그인 성공");
            window.location.href = "/"; // 로그인 후 리디렉션
            
        }
        } catch(error){
        console.error("로그인 오류")
        alert("로그인 실패")

     }
    }
    const logout=async()=> {
        try{
            await postLogout();
            removeAccessTokenFromStorage()
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);
            setUserName("");

            alert("로그아웃 성공")

        }catch(error) {
            console.error("로그아웃 오류",error);
            alert('로그아웃 실패')

        }
    }
    return(
        <AuthContext.Provider value={{accessToken,refreshToken,login,logout,userName, setUserName}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth=()=> {
    const context=useContext(AuthContext);
    if(!context){
        throw new Error("AuthContext를 찾을 수 없습니다.")
    }
    return context;
}