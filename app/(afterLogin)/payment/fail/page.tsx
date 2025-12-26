"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

/**
 * 결제 실패 페이지
 * 토스페이먼츠에서 결제 실패 시 리다이렉트되는 페이지입니다.
 */
export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // URL 파라미터에서 에러 정보 추출
    const errorCode = searchParams.get("code");
    const errorMessage = searchParams.get("message");

    // 에러 메시지 표시
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      toast.error("결제가 취소되었거나 실패했습니다.");
    }
  }, [searchParams]);

  const handleRetry = () => {
    // 이전 페이지로 돌아가기 (또는 장바구니/상품 페이지로 이동)
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full">
        <div className="text-center">
          {/* 에러 아이콘 */}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* 제목 */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            결제에 실패했습니다
          </h1>

          {/* 에러 메시지 */}
          <p className="text-gray-600 mb-4">
            {searchParams.get("message") ||
              "결제 중 오류가 발생했습니다. 다시 시도해주세요."}
          </p>

          {/* 에러 코드 (있는 경우) */}
          {searchParams.get("code") && (
            <p className="text-sm text-gray-500 mb-6">
              오류 코드: {searchParams.get("code")}
            </p>
          )}

          {/* 버튼 그룹 */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRetry}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              다시 시도하기
            </button>
            <button
              onClick={handleGoHome}
              className="inline-flex items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-gray-800 font-semibold hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
            >
              메인으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
