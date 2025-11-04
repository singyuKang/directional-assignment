export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: "NOTICE" | "QNA" | "FREE";
  tags: string[];
  createdAt: string;
}

export interface GetPostsParams {
  cursor?: string;
  limit?: number;
  search?: string;
  category?: string;
  sort?: "title" | "createdAt";
  order?: "asc" | "desc";
  prevCursor?: string;
  nextCursor?: string;
  from?: string;
  to?: string;
}

export interface GetPostsResponse {
  items: Post[];
  nextCursor: string | null;
  prevCursor: string | null;
}

export type CreatePostData = Omit<Post, "id" | "userId" | "createdAt">;
export type UpdatePostData = Partial<CreatePostData>;
