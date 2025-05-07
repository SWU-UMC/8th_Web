// types/comment.ts

export interface CommentAuthor {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: CommentAuthor;
}

export interface ResponseCommentListDto {
    status: boolean;
    statusCode: number;
    message: string;
    data: {
        data: Comment[];
        nextCursor: number;
        hasNext: boolean;
    };
}
