interface PostDetailActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function PostDetailActions({
  onEdit,
  onDelete,
}: PostDetailActionsProps) {
  return (
    <div className="border-t border-gray-200 p-6 flex gap-3 justify-end">
      <button
        onClick={onEdit}
        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
      >
        수정
      </button>
      <button
        onClick={onDelete}
        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        삭제
      </button>
    </div>
  );
}
