import { CursorBasedResponse } from "./common";

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