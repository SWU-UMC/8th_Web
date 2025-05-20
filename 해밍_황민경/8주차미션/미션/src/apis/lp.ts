import { CommonResponse, PaginationDto } from "../types/common";
import {
  CreateLpDto,
  RequestLpDto,
  ResponseCreateLpDto,
  ResponseLikeLpDto,
  ResponseLpDto,
  ResponseLpListDto,
} from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`v1/lps/${lpId}`);

  return data;
};

export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`v1/lps/${lpId}/likes`);

  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`v1/lps/${lpId}/likes`);

  return data;
};

export const postLp = async (
  dto: CreateLpDto
): Promise<ResponseCreateLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps", dto);
  return data;
};

//이미지 업로드

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post("/v1/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data.imageUrl;
};

//Lp 수정
export const patchLp = async (
  lpId: number,
  body: CreateLpDto
): Promise<ResponseCreateLpDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, body);
  return data;
};

//Lp 삭제
export const deleteLp = async (
  lpId: number
): Promise<CommonResponse<boolean>> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};
