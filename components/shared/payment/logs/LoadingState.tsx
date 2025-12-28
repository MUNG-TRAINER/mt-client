export default function LoadingState() {
  return (
    <div className="h-full overflow-hidden w-full">
      <div className="relative w-full max-w-4xl mx-auto h-full">
        <div className="bg-(--mt-white) rounded-lg shadow-sm h-full flex items-center justify-center p-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-(--mt-blue-point) mx-auto mb-4"></div>
            <p className="text-(--mt-gray)">결제 내역을 불러오는 중...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
