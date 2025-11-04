import { useState, useEffect } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  usePost,
  useCreatePost,
  useUpdatePost,
} from "./queries/usePostQueries";
import { getForbiddenWord } from "@/utils/validation";
import type { CreatePostData, UpdatePostData } from "@/models/Post";
import { AxiosError } from "axios";

interface UsePostFormOptions {
  mode: "create" | "edit";
}

export function usePostForm({ mode }: UsePostFormOptions) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<"NOTICE" | "QNA" | "FREE">("FREE");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState("");

  // Edit 모드일 때 기존 게시글 불러오기 (TanStack Query)
  const { data: post, isLoading: fetchLoading } = usePost(
    mode === "edit" ? id : undefined
  );

  // Mutations
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();

  const loading = createMutation.isPending || updateMutation.isPending;

  // Edit 모드에서 데이터 로드 시 폼 초기화
  useEffect(() => {
    if (mode === "edit" && post) {
      setTitle(post.title);
      setBody(post.body);
      setCategory(post.category);
      setTags(post.tags || []);
    }
  }, [mode, post]);

  // 태그 추가
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();

    if (!trimmedTag) return;

    if (tags.length >= 5) {
      setError("태그는 최대 5개까지 추가할 수 있습니다.");
      return;
    }

    if (trimmedTag.length > 24) {
      setError("태그는 최대 24자까지 입력할 수 있습니다.");
      return;
    }

    if (tags.includes(trimmedTag)) {
      setError("이미 추가된 태그입니다.");
      return;
    }

    setTags([...tags, trimmedTag]);
    setTagInput("");
    setError("");
  };

  // 태그 삭제
  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // 태그 입력에서 엔터키 처리
  const handleTagKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // 유효성 검사
  const validate = (): string | null => {
    if (!title.trim()) {
      return "제목을 입력해주세요.";
    }

    if (title.length > 80) {
      return "제목은 최대 80자까지 입력할 수 있습니다.";
    }

    if (!body.trim()) {
      return "본문을 입력해주세요.";
    }

    if (body.length > 2000) {
      return "본문은 최대 2000자까지 입력할 수 있습니다.";
    }

    const forbiddenInTitle = getForbiddenWord(title);
    if (forbiddenInTitle) {
      return `제목에 금칙어("${forbiddenInTitle}")가 포함되어 있습니다.`;
    }

    const forbiddenInBody = getForbiddenWord(body);
    if (forbiddenInBody) {
      return `본문에 금칙어("${forbiddenInBody}")가 포함되어 있습니다.`;
    }

    return null;
  };

  // 게시글 작성/수정
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const postData: CreatePostData | UpdatePostData = {
      title: title.trim(),
      body: body.trim(),
      category,
      tags,
    };

    try {
      if (mode === "create") {
        await createMutation.mutateAsync(postData as CreatePostData);
        alert("게시글이 작성되었습니다.");
        navigate("/posts");
      } else {
        if (!id) return;
        await updateMutation.mutateAsync({
          id,
          data: postData as UpdatePostData,
        });
        alert("게시글이 수정되었습니다.");
        navigate(`/posts/${id}`);
      }
    } catch (err) {
      console.error(`게시글 ${mode === "create" ? "작성" : "수정"} 실패:`, err);

      let errorMessage = `게시글 ${
        mode === "create" ? "작성" : "수정"
      }에 실패했습니다.`;

      if (err instanceof AxiosError && err.response?.data) {
        errorMessage = err.response.data.message || errorMessage;
      }

      setError(errorMessage);
    }
  };

  const handleCancel = () => {
    if (mode === "create") {
      navigate("/posts");
    } else {
      navigate(`/posts/${id}`);
    }
  };

  return {
    title,
    body,
    category,
    tagInput,
    tags,
    loading,
    fetchLoading,
    error,
    setTitle,
    setBody,
    setCategory,
    setTagInput,
    handleAddTag,
    handleRemoveTag,
    handleTagKeyPress,
    handleSubmit,
    handleCancel,
  };
}
