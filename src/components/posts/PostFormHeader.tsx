interface PostFormHeaderProps {
  title: string;
  onBack: () => void;
}

export default function PostFormHeader({ title, onBack }: PostFormHeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            목록으로
          </button>
        </div>
      </div>
    </header>
  );
}
