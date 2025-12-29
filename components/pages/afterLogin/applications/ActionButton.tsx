"use client";

import React, { useMemo } from "react"; // useMemo 추가
import useDeleteApplication from "@/hooks/afterLogin/applications/useDeleteApplication";
import { useApplicationState } from "@/stores/applicationsState";
import { ApplicationType } from "@/types/applications/applicationsType"; // ApplicationType 추가
import { useRouter } from "next/navigation";

interface Props {
  applications: ApplicationType[];
}
interface SelectedApplication {
  title: string;
  price: number;
  courseId: number;
  applicationId: number; // 세션별 ID
  dogId: number;
}

const ApplicationsActionButton: React.FC<Props> = ({ applications = [] }) => {
  const router = useRouter();
  const { activeTab, selectedIndex } = useApplicationState();
  const { mutate } = useDeleteApplication();

  // 선택된 앱들의 총합 계산
  const buttonText = useMemo(() => {
    if (activeTab === "pending") return "취소하기";

    // 결제 탭: 세션스토리지의 객체 배열에서 총 금액 계산
    const stored = sessionStorage.getItem("selectedApplications");
    if (!stored) return "결제하기";

    try {
      const selectedApplications: SelectedApplication[] = JSON.parse(stored);
      // ACCEPT 상태의 세션만 필터링
      const acceptItems = selectedApplications.filter((sel) => {
        const app = applications.find((a) => a.courseId === sel.courseId);
        const item = app?.applicationItems.find(
          (i) => i.applicationId === sel.applicationId
        );
        return item && item.applicationStatus === "ACCEPT";
      });

      if (acceptItems.length === 0) return "결제하기";

      const totalPrice = acceptItems.reduce((sum, sel) => sum + sel.price, 0);
      return `${totalPrice.toLocaleString()}원 결제하기`;
    } catch {
      return "결제하기";
    }
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
      const item = app?.applicationItems.find(
        (i) => i.applicationId === sel.applicationId
      );
      return item && item.applicationStatus === "ACCEPT";
    });

    if (selectedApplications.length === 0) {
      throw new Error("결제 가능한 항목이 없습니다.");
    }

    // 필터링된 결과를 세션 스토리지에 저장
    sessionStorage.setItem(
      "selectedApplications",
      JSON.stringify(selectedApplications)
    );
    router.push(`/payment/detail`);
  };
  return (
    <div className="sticky bottom-0 w-full p-4 bg-white border-t border-gray-300">
      <button
        onClick={handleOnClick}
        // 결제탭에서는 'ACCEPT' 상태의 선택된 항목이 없으면 비활성화
        disabled={
          activeTab === "pending"
            ? selectedIndex.length === 0
            : (() => {
                const stored = sessionStorage.getItem("selectedApplications");
                if (!stored) return true;
                try {
                  const selectedApplications: SelectedApplication[] =
                    JSON.parse(stored);
                  const acceptItems = selectedApplications.filter((sel) => {
                    const app = applications.find(
                      (a) => a.courseId === sel.courseId
                    );
                    const item = app?.applicationItems.find(
                      (i) => i.applicationId === sel.applicationId
                    );
                    return item && item.applicationStatus === "ACCEPT";
                  });
                  return acceptItems.length === 0;
                } catch {
                  return true;
                }
              })()
        }
        className={`
    w-full py-3 rounded-lg font-semibold transition-colors
    ${
      (
        activeTab === "pending"
          ? selectedIndex.length === 0
          : (() => {
              const stored = sessionStorage.getItem("selectedApplications");
              if (!stored) return true;
              try {
                const selectedApplications: SelectedApplication[] =
                  JSON.parse(stored);
                const acceptItems = selectedApplications.filter((sel) => {
                  const app = applications.find(
                    (a) => a.courseId === sel.courseId
                  );
                  const item = app?.applicationItems.find(
                    (i) => i.applicationId === sel.applicationId
                  );
                  return item && item.applicationStatus === "ACCEPT";
                });
                return acceptItems.length === 0;
              } catch {
                return true;
              }
            })()
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
