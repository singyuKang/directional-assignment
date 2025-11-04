const CATEGORIES = [
  { value: "NOTICE", label: "공지사항" },
  { value: "QNA", label: "질문답변" },
  { value: "FREE", label: "자유게시판" },
];

interface PostDetailHeaderProps {
  category: string;
  createdAt: string;
  title: string;
  tags: string[];
}

export default function PostDetailHeader({
  category,
  createdAt,
  title,
  tags,
}: PostDetailHeaderProps) {
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
    <div className="border-b border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`px-3 py-1 text-sm font-medium rounded ${getCategoryColor(
            category
          )}`}
        >
          {CATEGORIES.find((c) => c.value === category)?.label || category}
        </span>
        <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
