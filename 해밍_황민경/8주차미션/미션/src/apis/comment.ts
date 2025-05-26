import { axiosInstance } from "./axios";
import {
  CommentListResponse,
  CreateCommentDto,
  UpdateCommentDto,
  Comment,
} from "../types/comment";

export const getComments = async (
  lpId: number,
  cursor: number = 0
): Promise<CommentListResponse> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor },
  });
  return data;
};

export const postComment = async (
  lpId: number,
  dto: CreateCommentDto
): Promise<Comment> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, dto);
  return data.data;
};

export const patchComment = async (
  lpId: number,
  commentId: number,
  dto: UpdateCommentDto
): Promise<Comment> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    dto
  );
  return data.data;
};

export const deleteComment = async (
  lpId: number,
  commentId: number
): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data.data;
};
