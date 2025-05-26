import { PaginationDto } from "../types/common";
import { RequestLpDto, RequestPostLpDto, RequestUpdateLpDto, ResponseLikeLpDto, ResponseLpDto, ResponseLpListDto, ResponsePostLpDto } from "../types/lp";
import { axiosInstance } from "./axios";


export const getLpList = async (paginationDto:PaginationDto):Promise<ResponseLpListDto> => {
    const{data} = await axiosInstance.get('/v1/lps', {
        params: paginationDto,
    })
    return data;
}

export const getLpDetail = async ({lpId}:RequestLpDto):Promise<ResponseLpDto> => {
    const {data} = await axiosInstance.get(`/v1/lps/${lpId}`);

    return data;
}

export const postLike = async ({lpId}:RequestLpDto):Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

    return data;
}

export const deleteLike = async ({lpId}:RequestLpDto):Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

    return data;
}

export const postLp = async (dto: RequestPostLpDto): Promise<ResponsePostLpDto> => {
    const { data } = await axiosInstance.post("/v1/lps", dto);
    return data;
};

export const updateLp = async ({ lpId, ...updateData }: RequestUpdateLpDto): Promise<ResponseLpDto> => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, updateData);
    return data;
};


export const deleteLp = async ({ lpId }: RequestLpDto): Promise<void> => {
await axiosInstance.delete(`/v1/lps/${lpId}`);
};