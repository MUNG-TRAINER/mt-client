"use client";

import React, {useMemo} from "react"; // useMemo 추가
import useDeleteApplication from "@/hooks/afterLogin/applications/useDeleteApplication";
import {useApplicationState} from "@/stores/applicationsState";
import {ApplicationType} from "@/types/applications/applicationsType"; // ApplicationType 추가
import {useRouter} from "next/navigation";

interface Props {
  applications: ApplicationType[];
}
interface SelectedApplication {
  title: string;
  price: number;
  courseId: number;
}

const ApplicationsActionButton: React.FC<Props> = ({applications = []}) => {
  const router = useRouter();
  const {activeTab, selectedIndex} = useApplicationState();
  const {mutate} = useDeleteApplication();

  // 선택된 앱들의 총합 계산
  const buttonText = useMemo(() => {
    if (activeTab === "pending") return "취소하기";

    // 결제 탭에서는 'ACCEPT' 상태만 결제 가능
    const selectedAcceptApps = selectedIndex
      .map((id) => applications.find((app) => app.courseId === id))
      .filter((app) => app && app.applicationStatus === "ACCEPT");

    if (selectedAcceptApps.length === 0) return "결제하기";

    const totalPrice = selectedAcceptApps.reduce(
      (sum, app) => sum + (app?.price ?? 0),
      0
    );
    return `${totalPrice.toLocaleString()}원 결제하기`;
  }, [activeTab, selectedIndex, applications]);

  const handleOnClick = () => {
    if (activeTab === "pending") {
      mutate(selectedIndex);
      return;
    }

    // sessionStorage에서 선택된 항목 가져오기
    const selected = sessionStorage.getItem("selectedApplications");
    let selectedApplications: SelectedApplication[] = selected
      ? JSON.parse(selected)
      : [];

    // 'ACCEPT' 상태만 결제 가능하도록 필터링
    selectedApplications = selectedApplications.filter((sel) => {
      const app = applications.find((a) => a.courseId === sel.courseId);
      return app && app.applicationStatus === "ACCEPT";
    });

    if (selectedApplications.length === 0) {
      throw new Error("결제 가능한 항목이 없습니다.");
    }

    const query = encodeURIComponent(JSON.stringify(selectedApplications));
    router.push(`/payment/detail?selectedApplications=${query}`);
  };
  return (
    <div className="sticky bottom-0 w-full p-4 bg-white border-t border-gray-300">
      <button
        onClick={handleOnClick}
        // 결제탭에서는 'ACCEPT' 상태의 선택된 항목이 없으면 비활성화
        disabled={
          activeTab === "pending"
            ? selectedIndex.length === 0
            : selectedIndex
                .map((id) => applications.find((app) => app.courseId === id))
                .filter((app) => app && app.applicationStatus === "ACCEPT")
                .length === 0
        }
        className={`
    w-full py-3 rounded-lg font-semibold transition-colors
    ${
      (
        activeTab === "pending"
          ? selectedIndex.length === 0
          : selectedIndex
              .map((id) => applications.find((app) => app.courseId === id))
              .filter((app) => app && app.applicationStatus === "ACCEPT")
              .length === 0
      )
        ? "bg-(--mt-gray) text-gray-200 cursor-not-allowed"
        : "bg-(--mt-blue-point) text-white"
    }
  `}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ApplicationsActionButton;
