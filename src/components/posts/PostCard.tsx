import type { Post } from "@/models/Post";

const CATEGORIES = [
  { value: "", label: "전체" },
  { value: "NOTICE", label: "공지사항" },
  { value: "QNA", label: "질문답변" },
  { value: "FREE", label: "자유게시판" },
];

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "NOTICE":
        return "bg-red-100 text-red-800";
      case "QNA":
        return "bg-blue-100 text-blue-800";
      case "FREE":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <li
      onClick={onClick}
      className="p-6 hover:bg-gray-50 cursor-pointer transition"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(
                post.category
              )}`}
            >
              {CATEGORIES.find((c) => c.value === post.category)?.label ||
                post.category}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(post.createdAt)}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">{post.body}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
