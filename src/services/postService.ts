import instance from "@/lib/axios";
import type {
  Post,
  GetPostsParams,
  GetPostsResponse,
  CreatePostData,
  UpdatePostData,
} from "../models/Post";

export const PostService = {
  // 게시글 목록 조회
  getPosts: async (params?: GetPostsParams): Promise<GetPostsResponse> => {
    const response = await instance.get("/posts", { params });
    return response.data;
  },

  // 게시글 상세 조회
  getPost: async (id: string): Promise<Post> => {
    const response = await instance.get(`/posts/${id}`);
    return response.data;
  },

  // 게시글 작성
  createPost: async (data: CreatePostData): Promise<Post> => {
    const response = await instance.post("/posts", data);
    return response.data;
  },

  // 게시글 수정 (PATCH)
  updatePost: async (id: string, data: UpdatePostData): Promise<Post> => {
    const response = await instance.patch(`/posts/${id}`, data);
    return response.data;
  },

  // 게시글 삭제
  deletePost: async (id: string): Promise<{ ok: boolean; deleted: number }> => {
    const response = await instance.delete(`/posts/${id}`);
    return response.data;
  },

  // 전체 게시글 삭제
  deleteAllPosts: async (): Promise<{ ok: boolean; deleted: number }> => {
    const response = await instance.delete("/posts");
    return response.data;
  },
};
