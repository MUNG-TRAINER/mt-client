interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="h-full overflow-hidden w-full">
      <div className="relative w-full max-w-4xl mx-auto h-full">
        <div className="bg-(--mt-white) rounded-lg shadow-sm h-full flex items-center justify-center p-4">
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-(--mt-black) mb-2">
              오류가 발생했습니다
            </h1>
            <p className="text-(--mt-gray) mb-4">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
