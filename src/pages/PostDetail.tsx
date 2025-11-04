import { usePostDetail } from "@/hooks/usePostDetail";
import PostFormHeader from "@/components/posts/PostFormHeader";
import PostDetailHeader from "@/components/posts/PostDetailHeader";
import PostDetailBody from "@/components/posts/PostDetailBody";
import PostDetailActions from "@/components/posts/PostDetailActions";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function PostDetail() {
  const { post, loading, error, handleDelete, handleEdit, handleBack } =
    usePostDetail();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !post) {
    return (
      <ErrorMessage
        message={error || "게시글을 찾을 수 없습니다."}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PostFormHeader title="게시글 상세" onBack={handleBack} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <PostDetailHeader
            category={post.category}
            createdAt={post.createdAt}
            title={post.title}
            tags={post.tags}
          />

          <PostDetailBody body={post.body} />

          <PostDetailActions onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
