import type { FormEvent } from "react";

const CATEGORIES = [
  { value: "", label: "전체" },
  { value: "NOTICE", label: "공지사항" },
  { value: "QNA", label: "질문답변" },
  { value: "FREE", label: "자유게시판" },
];

interface PostSearchFilterProps {
  search: string;
  category: string;
  sort: "title" | "createdAt";
  order: "asc" | "desc";
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: "title" | "createdAt") => void;
  onOrderChange: (value: "asc" | "desc") => void;
  onSubmit: (e: FormEvent) => void;
}

export default function PostSearchFilter({
  search,
  category,
  sort,
  order,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onOrderChange,
  onSubmit,
}: PostSearchFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <form onSubmit={onSubmit} className="space-y-4">
        {/* 검색 */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="제목 또는 본문 검색..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            검색
          </button>
        </div>

        {/* 필터 및 정렬 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 카테고리 */}
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* 정렬 기준 */}
          <select
            value={sort}
            onChange={(e) =>
              onSortChange(e.target.value as "title" | "createdAt")
            }
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="createdAt">작성일순</option>
            <option value="title">제목순</option>
          </select>

          {/* 정렬 순서 */}
          <select
            value={order}
            onChange={(e) => onOrderChange(e.target.value as "asc" | "desc")}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="desc">내림차순</option>
            <option value="asc">오름차순</option>
          </select>
        </div>
      </form>
    </div>
  );
}
