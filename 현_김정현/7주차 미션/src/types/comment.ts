// types/comment.ts
import { PAGINATION_ORDER } from "../enums/common";
import { CursorBasedResponse } from "./common";

export type Comment = {
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
        createdAt: string;
        updatedAt: string;
    };
};

export type RequestCommentListDto = {
    lpId: number;
    cursor?: number;
    order?: PAGINATION_ORDER;
    limit?: number;
};

export type ResponseCommentListDto = CursorBasedResponse<Comment[]>;