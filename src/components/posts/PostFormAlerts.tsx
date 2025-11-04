interface PostFormAlertsProps {
  error?: string;
}

export default function PostFormAlerts({ error }: PostFormAlertsProps) {
  return (
    <>
      {/* 금칙어 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-sm text-yellow-800">
          ⚠️ 다음 단어는 사용할 수 없습니다: 캄보디아, 프놈펜, 불법체류,
          텔레그램
        </p>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </>
  );
}
