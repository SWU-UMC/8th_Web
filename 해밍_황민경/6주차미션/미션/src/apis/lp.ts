import { PaginationDto } from "../types/common";
import { Lp, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

//Lp 상세 조회 API
export const getLpDetail = async (lpId: number): Promise<Lp> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data.data;
};
