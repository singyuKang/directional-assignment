interface ErrorMessageProps {
  message: string;
  onBack: () => void;
}

export default function ErrorMessage({ message, onBack }: ErrorMessageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 mb-4">{message}</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          목록으로
        </button>
      </div>
    </div>
  );
}
