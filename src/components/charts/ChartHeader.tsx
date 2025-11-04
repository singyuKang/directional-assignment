interface ChartHeaderProps {
  onNavigateBack: () => void;
}

export default function ChartHeader({ onNavigateBack }: ChartHeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">데이터 시각화</h1>
          <button
            onClick={onNavigateBack}
            className="text-gray-600 hover:text-gray-900"
          >
            게시판으로
          </button>
        </div>
      </div>
    </header>
  );
}
