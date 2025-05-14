
import { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth";
import { axiosInstance } from "./axios";

export const postSignup= async(body: RequestSignupDto): Promise<ResponseSignupDto> => {
    const {data}= await axiosInstance.post( "v1/auth/signup",body);
    return data;
}

export const postSignin= async(body: RequestSigninDto): Promise<ResponseSigninDto> => {
    const {data}= await axiosInstance.post( "v1/auth/signin",body);
    return data;
}

export const getMyInfo=async(): Promise<ResponseMyInfoDto>=> {
    const {data}=await axiosInstance.get("/v1/users/me",)
    return data;
}
export const postLogout=async()=> {
    const{data}=await axiosInstance.post("/v1/auth/signout");
    return data
}

// apis/auth.ts에 추가
export const updateProfile = async (data: FormData) => {
  const response = await fetch('/v1/users', {
    method: 'PATCH',
    body: data,
  });
  
  if (!response.ok) {
    throw new Error('프로필 업데이트에 실패했습니다.');
  }
  
  return response.json();
};