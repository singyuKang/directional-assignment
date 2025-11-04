interface PostListActionsProps {
  onDeleteAll: () => void;
  onCreate: () => void;
}

export default function PostListActions({
  onDeleteAll,
  onCreate,
}: PostListActionsProps) {
  return (
    <div className="flex justify-end gap-3 mb-4">
      <button
        onClick={onDeleteAll}
        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        전체 삭제
      </button>
      <button
        onClick={onCreate}
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        글쓰기
      </button>
    </div>
  );
}
