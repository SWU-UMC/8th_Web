import { PaginationDto } from "../types/common"
import { RequestLikeLpDto, RequestLpDto, ResponseLikeLpDto, ResponseLpDetailDto, ResponseLpDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios"

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get("/v1/lps", {
        params: paginationDto,
    });

    return data;
};

export const getLpDetail = async (lpId: number): Promise<ResponseLpDetailDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
    return data;
};

export const postLike = async ({ lpId }: RequestLikeLpDto): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.post(`v1/lps/${lpId}/likes`);
    
    return data;
}

export const deleteLike = async ({ lpId }: RequestLikeLpDto): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.delete(`v1/lps/${lpId}/likes`);

    return data;
}

export const createLp = async ({
    title,
    content,
    thumbnail,
    tags,
    published,
}: RequestLpDto): Promise<ResponseLpDto> => {
    const { data } = await axiosInstance.post('/v1/lps', {
        title,
        content,
        thumbnail,
        tags,
        published,
    });

    return data;
};

export const updateLp = async (
    lpId: number,
    { title, content, thumbnail, tags, published }: RequestLpDto
): Promise<ResponseLpDto> => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, {
        title,
        content,
        thumbnail,
        tags,
        published,
    });

    return data;
};

export const deleteLp = async (lpId: number): Promise<{ data: boolean }> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
    return data;
};
