
import { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto, UpdateUserInfoDto } from "../types/auth";
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


export const updateProfile = async (data: FormData): Promise<ResponseMyInfoDto> => {
  const response = await axiosInstance.patch("/v1/users", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


export const deleteUser = async (): Promise<void> => {
  await axiosInstance.delete('/v1/users');
};

