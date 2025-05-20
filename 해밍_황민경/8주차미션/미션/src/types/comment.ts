export type Author = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
};

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
};

export type CommentListResponse = {
  data: {
    data: Comment[];
    hasNext: boolean;
    nextCursor: number | null;
  };
};

export type CreateCommentDto = {
  content: string;
};

export type UpdateCommentDto = {
  content: string;
};
