import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PostService } from "@/services/postService";
import type {
  CreatePostData,
  UpdatePostData,
  GetPostsParams,
} from "@/models/Post";

// 게시글 목록 조회
export function usePosts(params: GetPostsParams) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => PostService.getPosts(params),
    staleTime: 1 * 60 * 1000,
  });
}

// 게시글 상세 조회
export function usePost(id: string | undefined) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => PostService.getPost(id!),
    enabled: !!id,
  });
}

// 게시글 작성
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostData) => PostService.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

// 게시글 수정
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostData }) =>
      PostService.updatePost(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

// 게시글 삭제
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => PostService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

// 전체 게시글 삭제
export function useDeleteAllPosts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => PostService.deleteAllPosts(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
