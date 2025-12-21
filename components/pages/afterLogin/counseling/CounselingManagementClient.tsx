"use client";

import { useState } from "react";
import Tabs from "@/components/shared/tabs/Tabs";
import { CounselingList } from "./CounselingList";
import { useCounselingList } from "@/hooks/afterLogin/counseling/useCounselingList";
import { CounselingWriteModal } from "./CounselingWriteModal";
import { counselingApi } from "@/apis/counseling/counselingApi";
import { useQueryClient } from "@tanstack/react-query";
import type { CounselingDog } from "@/types/counseling/counselingType";

type CounselingTab = "pending" | "completed";

const TAB_LABELS: Record<CounselingTab, string> = {
  pending: "상담 미완료",
  completed: "상담 완료",
};

export default function CounselingManagementClient() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<CounselingTab>("pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState<CounselingDog | null>(null);

  // 상담 완료 여부에 따라 데이터 조회
  const { data: dogs, isLoading } = useCounselingList(
    activeTab === "completed"
  );

  const handleViewDetail = (counselingId: number) => {
    const dog = dogs?.find((d) => d.counselingId === counselingId);
    if (dog) {
      setSelectedDog(dog);
      setIsModalOpen(true);
    }
  };

  const handleSubmitCounseling = async (content: string) => {
    if (!selectedDog) return;

    try {
      await counselingApi.saveCounselingContent(
        selectedDog.counselingId,
        content
      );

      // React Query 캐시 무효화 - 리스트 자동 새로고침
      await queryClient.invalidateQueries({
        queryKey: ["counseling", "list"],
      });

      // 모달 닫기
      setIsModalOpen(false);
      setSelectedDog(null);
    } catch (error) {
      console.error("상담 내용 저장 실패:", error);
      throw error; // 모달에서 로딩 상태 해제를 위해
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 탭 */}
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabLabels={TAB_LABELS}
      />

      {/* 리스트 */}
      <div className="flex-1 overflow-y-auto py-4">
        <CounselingList
          dogs={dogs || []}
          isCompleted={activeTab === "completed"}
          isLoading={isLoading}
          isEmpty={!isLoading && (!dogs || dogs.length === 0)}
          onViewDetail={handleViewDetail}
        />
      </div>

      {/* 상담 작성/수정 모달 */}
      <CounselingWriteModal
        isOpen={isModalOpen}
        dogId={selectedDog?.dogId || 0}
        dogName={selectedDog?.dogName || ""}
        ownerName={selectedDog?.ownerName || ""}
        content={selectedDog?.content}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDog(null);
        }}
        onSubmit={handleSubmitCounseling}
      />
    </div>
  );
}
