interface PostListHeaderProps {
  onNavigateToCharts: () => void;
  onLogout: () => void;
}

export default function PostListHeader({
  onNavigateToCharts,
  onLogout,
}: PostListHeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">게시판</h1>
        <div className="flex gap-4">
          <button
            onClick={onNavigateToCharts}
            className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800"
          >
            차트 보기
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
