"use client";

import useDeleteApplication from "@/hooks/afterLogin/applications/useDeleteApplication";
import {useApplicationState} from "@/stores/applicationsState";

const ApplicationsActionButton = () => {
  const {activeTab, selectedIndex} = useApplicationState();
  const {mutate} = useDeleteApplication();
  const handleOnClick = () => {
    return activeTab === "pending" ? mutate(selectedIndex) : () => {};
  };
  return (
    <div className="sticky bottom-0 w-full p-4 bg-white border-t border-gray-300">
      <button
        onClick={handleOnClick}
        disabled={selectedIndex.length === 0} // 선택 없으면 비활성화
        className={`
    w-full py-3 rounded-lg font-semibold transition-colors
    ${
      selectedIndex.length === 0
        ? "bg-(--mt-gray) text-gray-200 cursor-not-allowed" // 비활성화 스타일
        : "bg-(--mt-blue-point) text-white"
    } // 활성화 스타일
  `}
      >
        {activeTab === "pending" ? "취소하기" : "결제하기"}
      </button>
    </div>
  );
};

export default ApplicationsActionButton;
