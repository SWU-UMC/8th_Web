
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

