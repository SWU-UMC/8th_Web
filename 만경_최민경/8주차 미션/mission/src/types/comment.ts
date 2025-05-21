export interface Author {
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
    author: Author;
  }
  
  export interface CommentListResponse {
    status: boolean;
    statusCode: number;
    message: string;
    data: {
      data: Comment[];
      nextCursor: number | null;
      hasNext: boolean;
    };
  }
  
  export interface SingleCommentResponse {
    status: boolean;
    statusCode: number;
    message: string;
    data: Comment;
  }
  
  export type CommentSortType = "latest" | "oldest";