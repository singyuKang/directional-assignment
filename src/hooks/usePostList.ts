import { useState } from "react";
import type { FormEvent } from "react";
import { usePosts, useDeleteAllPosts } from "./queries/usePostQueries";
import type { GetPostsParams } from "@/models/Post";

export function usePostList() {
  // 필터 상태
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<"title" | "createdAt">("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 커서 상태
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(
    undefined
  );
  const [cursorHistory, setCursorHistory] = useState<(string | undefined)[]>(
    []
  );

  // 쿼리 파라미터 구성
  const params: GetPostsParams = {
    limit: 10,
    sort,
    order,
  };

  if (currentCursor) {
    params.nextCursor = currentCursor;
  }
  if (search) params.search = search;
  if (category) params.category = category;

  const { data, isLoading: loading, error } = usePosts(params);
  const deleteAllMutation = useDeleteAllPosts();

  const posts = data?.items ?? [];
  const nextCursor = data?.nextCursor ?? null;

  // 검색
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setCurrentCursor(undefined);
    setCursorHistory([]);
  };

  // 다음 페이지
  const handleNext = () => {
    if (nextCursor && !loading) {
      setCursorHistory([...cursorHistory, currentCursor]);
      setCurrentCursor(nextCursor);
    }
  };

  // 이전 페이지
  const handlePrev = () => {
    if (cursorHistory.length > 0 && !loading) {
      const newHistory = [...cursorHistory];
      const prevPageCursor = newHistory.pop();
      setCursorHistory(newHistory);
      setCurrentCursor(prevPageCursor);
    }
  };

  // 전체 삭제
  const handleDeleteAll = async () => {
    if (
      !confirm(
        "정말 모든 게시글을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다."
      )
    ) {
      return;
    }

    try {
      const result = await deleteAllMutation.mutateAsync();
      alert(`${result.deleted}개의 게시글이 삭제되었습니다.`);
      setCurrentCursor(undefined);
      setCursorHistory([]);
    } catch (error) {
      console.error("전체 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  return {
    // 상태
    posts,
    loading,
    error: error ? "게시글을 불러오는데 실패했습니다." : "",
    nextCursor,
    cursorHistory,
    search,
    category,
    sort,
    order,

    // 상태 변경 함수
    setSearch,
    setCategory,
    setSort,
    setOrder,

    // 핸들러
    handleSearch,
    handleNext,
    handlePrev,
    handleDeleteAll,
  };
}
