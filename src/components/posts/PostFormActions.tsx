interface PostFormActionsProps {
  loading: boolean;
  submitText: string;
  onCancel: () => void;
}

export default function PostFormActions({
  loading,
  submitText,
  onCancel,
}: PostFormActionsProps) {
  return (
    <div className="flex gap-3 justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
      >
        취소
      </button>
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? `${submitText} 중...` : submitText}
      </button>
    </div>
  );
}
