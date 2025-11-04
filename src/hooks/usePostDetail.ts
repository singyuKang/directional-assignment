import { useNavigate, useParams } from "react-router-dom";
import { usePost, useDeletePost } from "./queries/usePostQueries";

export function usePostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading: loading, error } = usePost(id);
  const deleteMutation = useDeletePost();

  const handleDelete = async () => {
    if (!id) return;

    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      alert("게시글이 삭제되었습니다.");
      navigate("/posts");
    } catch (err) {
      console.error("게시글 삭제 실패:", err);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  const handleBack = () => {
    navigate("/posts");
  };

  return {
    id,
    post,
    loading,
    error: error ? "게시글을 불러오는데 실패했습니다." : "",
    handleDelete,
    handleEdit,
    handleBack,
  };
}
