import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
};

export type Lp = {
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
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type Author = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string;
    createdAt: string;
    updatedAt: string;
};

export type ResponseLpDetailDto = CommonResponse<{
    id: number;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorId: number;
        createdAt: string;
        updatedAt: string;
        author: Author;
        tags: Tag[];
        likes: Likes[];
}>;

export type LpComment = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: Author;
};

export type ResponseLpCommentListDto = CursorBasedResponse<LpComment[]>;