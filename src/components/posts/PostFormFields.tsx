const CATEGORIES = [
  { value: "NOTICE", label: "공지사항" },
  { value: "QNA", label: "질문답변" },
  { value: "FREE", label: "자유게시판" },
];

interface PostFormFieldsProps {
  title: string;
  body: string;
  category: "NOTICE" | "QNA" | "FREE";
  onTitleChange: (value: string) => void;
  onBodyChange: (value: string) => void;
  onCategoryChange: (value: "NOTICE" | "QNA" | "FREE") => void;
}

export default function PostFormFields({
  title,
  body,
  category,
  onTitleChange,
  onBodyChange,
  onCategoryChange,
}: PostFormFieldsProps) {
  return (
    <>
      {/* 카테고리 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          카테고리 <span className="text-red-500">*</span>
        </label>
        <select
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value as "NOTICE" | "QNA" | "FREE")
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* 제목 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          제목 <span className="text-red-500">*</span>
          <span className="text-gray-500 text-xs ml-2">
            ({title.length}/80)
          </span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          maxLength={80}
          placeholder="제목을 입력하세요"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* 본문 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          본문 <span className="text-red-500">*</span>
          <span className="text-gray-500 text-xs ml-2">
            ({body.length}/2000)
          </span>
        </label>
        <textarea
          value={body}
          onChange={(e) => onBodyChange(e.target.value)}
          maxLength={2000}
          rows={10}
          placeholder="본문을 입력하세요"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>
    </>
  );
}
