import { PaginationDto } from "../types/common"; // PaginationDto 가져오기
import { ResponseCommentListDto } from "../types/comment";
import { axiosInstance } from "./axios";

export const getComments = async ({ lpId, paginationDto }: {
    lpId: number;
    paginationDto: PaginationDto;
}): Promise<ResponseCommentListDto> => {
    console.log("getComments - lpId:", lpId);
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      ...paginationDto, // paginationDto에서 모든 값을 넘김
    },
  });

  return data;
};