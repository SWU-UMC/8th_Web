import { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSignupDto } from "../types/auth";
import { axiosInstance } from "./axios";

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post("v1/auth/signup", body);

    return data;
};

export const postSignin = async (body: RequestSigninDto) => {
    const { data } = await axiosInstance.post("v1/auth/signin", body);

    return data;
}

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get("v1/users/me");

    return data;
}

export const postLogout = async () => {
    const { data } = await axiosInstance.post("/v1/auth/signout");

    return data;
}