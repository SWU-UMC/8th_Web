import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag={
    id: number,
    name: string;
}

export type Likes={
    id: number;
    userId: number;
    lpid: number;
}

export type Author = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };

export type Lp={
    "id": number,
        "title": string,
        "content": string,
        "thumbnail": string,
        "published": boolean,
        "authorId": number,
        "createdAt": Date,
        "updatedAt": Date,
        "likesCount": number,
        tags: Tag[],
        likes: Likes[];
}



export type ResponseLpListDto=CursorBasedResponse<Lp[]>

export type RequestLpDto={
    lpId:number;
  
}

export type ResponseLpDto=CommonResponse<{}>

export type ResponseLpDetailDto = {
    status: boolean;
    statusCode: number;
    message: string;
    data: {
        id: number;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorId: number;
        createdAt: string;
        updatedAt: string;
        tags: Tag[];
        likes: Likes[];
        author: Author;
    };
};

export type ResponseLikeLpDto= CommonResponse<{
    id: number;
    userId: number;
    lpId: number;
}>




export interface CreateLpRequest {
  title: string;
  content: string;
  tags: string[];
  published: boolean;
  thumbnail?: File | null;
}

export interface CreateLpResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
  };
}
