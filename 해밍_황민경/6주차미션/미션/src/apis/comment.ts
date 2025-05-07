import { axiosInstance } from "./axios";
import { CursorBasedResponse } from "../types/common";

export interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
  };
}
export type ResponseCommentListDto = CursorBasedResponse<Comment[]>;

export const getCommentList = async (
  lpId: number,
  cursor: number,
  order: "ASC" | "DESC"
): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      cursor,
      order,
    },
  });
  return data.data;
};
