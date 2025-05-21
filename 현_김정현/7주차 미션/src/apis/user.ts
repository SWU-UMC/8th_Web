import { ResponseMyInfoDto } from "../types/auth";
import { axiosInstance } from "./axios";

export const getUserById = async (id: number) => {
    const { data } = await axiosInstance.get(`/v1/users/${id}`);
    return data;
};

export const updateMyInfo = async (form: {
    name: string;
    bio: string;
    avatar: string | null;
}): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.patch("/v1/users", form);
    return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get("/v1/users");
    return data;
};