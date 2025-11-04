import type { KeyboardEvent } from "react";

interface PostTagInputProps {
  tagInput: string;
  tags: string[];
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (index: number) => void;
  onKeyPress: (e: KeyboardEvent) => void;
}

export default function PostTagInput({
  tagInput,
  tags,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
  onKeyPress,
}: PostTagInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        태그{" "}
        <span className="text-gray-500 text-xs">(최대 5개, 각 24자 이내)</span>
      </label>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => onTagInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          maxLength={24}
          placeholder="태그를 입력하고 Enter 또는 추가 버튼을 누르세요"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={onAddTag}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          추가
        </button>
      </div>

      {/* 태그 목록 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
            >
              #{tag}
              <button
                type="button"
                onClick={() => onRemoveTag(index)}
                className="hover:text-indigo-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
