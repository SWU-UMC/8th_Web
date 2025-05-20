import { PaginationDto } from "../types/common"; // PaginationDto 가져오기
import { ResponseCommentListDto } from "../types/comment";
import { axiosInstance } from "./axios";

export const getComments = async ({ lpId, paginationDto }: {
  lpId: number;
  paginationDto: PaginationDto;
}): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      ...paginationDto, // paginationDto에서 모든 값을 넘김
    },
  });

  return data;
};

export const createComment = async ({
  lpId,
  content,
}: {
  lpId: number;
  content: string;
}) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });

  return data;
};

export const patchComment = async ({
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