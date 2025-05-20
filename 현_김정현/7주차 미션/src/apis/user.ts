import { axiosInstance } from "./axios";

export const getUserById = async (id: number) => {
    const { data } = await axiosInstance.get(`/v1/users/${id}`);
    return data;
};
