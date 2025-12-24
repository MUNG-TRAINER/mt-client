"use client";

import React, {useMemo} from "react"; // useMemo 추가
import useDeleteApplication from "@/hooks/afterLogin/applications/useDeleteApplication";
import {useApplicationState} from "@/stores/applicationsState";
import {ApplicationType} from "@/types/applications/applicationsType"; // ApplicationType 추가

interface Props {
  applications: ApplicationType[];
}
const ApplicationsActionButton: React.FC<Props> = ({applications = []}) => {
  const {activeTab, selectedIndex} = useApplicationState();
  const {mutate} = useDeleteApplication();

  // 선택된 앱들의 총합 계산
  const buttonText = useMemo(() => {
    if (activeTab === "pending") return "취소하기";

    // 체크된 항목 없으면 그냥 "결제하기"
    if (selectedIndex.length === 0) return "결제하기";

    // 선택된 항목 총합
    const totalPrice = selectedIndex.reduce((sum, id) => {
      const app = applications.find((app) => app.courseId === id);
      return sum + (app?.price ?? 0);
    }, 0);

    return `${totalPrice.toLocaleString()}원 결제하기`;
  }, [activeTab, selectedIndex, applications]);

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
        {buttonText}
      </button>
    </div>
  );
};

export default ApplicationsActionButton;
