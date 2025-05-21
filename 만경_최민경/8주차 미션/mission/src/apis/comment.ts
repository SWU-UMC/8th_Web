
import { CommentListResponse, CommentSortType } from "../types/comment";
import { axiosInstance } from "./axios";


export const getComments = async (
  lpId: number, 
  sortType: CommentSortType = 'latest',
  limit: number = 10,
  cursor?: number
): Promise<CommentListResponse> => {
  const params: Record<string, any> = { 
    limit, 
    sort: sortType,
    ...(cursor !== undefined && { cursor })
  };

  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, { params });
  return data;
};


export const postComment = async (
  lpId: number,
  content: string
): Promise<void> => {
  await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
};

export const updateComment = async ({
  lpId,
  commentId,
  content,
}: {
  lpId: number;
  commentId: number;
  content: string;
}) => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, {
    content,
  });

  return data;
};

export const deleteComment = async ({
  lpId,
  commentId,
}: {
  lpId: number,
  commentId: number;
}): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
  return data.data;
};

