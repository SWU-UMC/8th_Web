import { CreateLpRequest, CreateLpResponse, RequestLpDto, ResponseLikeLpDto, ResponseLpDto } from './../types/lp';
import { PaginationDto } from "../types/common";
import {  ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";


export const getLpList=async(paginationDto: PaginationDto
):Promise<ResponseLpListDto> => {
    const{data}=await axiosInstance.get('v1/lps',{
        params:paginationDto,
    })

    return data;
}

// export const getLpDetail = async (lpId:number): Promise<ResponseLpDetailDto> => {
//     const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
//     return data;
//   };

export const getLpDetail = async ({lpId}:RequestLpDto): Promise<ResponseLpDetailDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
    return data;
  };


export const postLike=async({lpId}:RequestLpDto): Promise<ResponseLikeLpDto> =>{
    const {data}= await axiosInstance.post(`/v1/lps/${lpId}/likes`)
    return data;
}

export const deleteLike=async({
    lpId}
    :RequestLpDto): Promise<ResponseLikeLpDto> => {
    const {data}=await axiosInstance.delete(`/v1/lps/${lpId}/likes`)
    return data;
}

export const createLp = async ({
    title,
    content,
    thumbnail,
    tags,
    published,
}: CreateLpRequest): Promise<CreateLpResponse> => {
    const { data } = await axiosInstance.post('/v1/lps', {
        title,
        content,
        thumbnail,
        tags,
        published,
    });

    return data;
};

   