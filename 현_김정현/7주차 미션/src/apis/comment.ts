import { axiosInstance } from "./axios";
import { RequestCommentListDto, ResponseCommentListDto } from "../types/comment";

export const getCommentList = async (
    params: RequestCommentListDto
    ): Promise<ResponseCommentListDto> => {
    const { lpId, ...query } = params;
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
        params: query,
    });
    return data;
};

export const postComment = async (lpId: number, content: string): Promise<any> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
    return data;
};

export const updateComment = async (lpId: number, commentId: number, content: string) => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, {
        content,
    });
    return data;
};

export const deleteComment = async (lpId: number, commentId: number) => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
    return data;
};