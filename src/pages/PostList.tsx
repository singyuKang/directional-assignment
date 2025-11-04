import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PostListHeader from "@/components/posts/PostListHeader";
import PostSearchFilter from "@/components/posts/PostSearchFilter";
import PostListActions from "@/components/posts/PostListActions";
import PostCard from "@/components/posts/PostCard";
import PostListPagination from "@/components/posts/PostListPagination";
import { usePostList } from "@/hooks/usePostList";

export default function PostList() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const {
    posts,
    loading,
    nextCursor,
    cursorHistory,
    search,
    category,
    sort,
    order,
    setSearch,
    setCategory,
    setSort,
    setOrder,
    handleSearch,
    handleNext,
    handlePrev,
    handleDeleteAll,
  } = usePostList();

  return (
    <div className="min-h-screen bg-gray-50">
      <PostListHeader
        onNavigateToCharts={() => navigate("/charts")}
        onLogout={logout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PostSearchFilter
          search={search}
          category={category}
          sort={sort}
          order={order}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onSortChange={setSort}
          onOrderChange={setOrder}
          onSubmit={handleSearch}
        />

        <PostListActions
          onDeleteAll={handleDeleteAll}
          onCreate={() => navigate("/posts/create")}
        />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading && posts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">로딩 중...</div>
          ) : posts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              게시글이 없습니다.
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onClick={() => navigate(`/posts/${post.id}`)}
                  />
                ))}
              </ul>

              <PostListPagination
                currentPage={cursorHistory.length + 1}
                hasNext={!!nextCursor}
                hasPrev={cursorHistory.length > 0}
                loading={loading}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
