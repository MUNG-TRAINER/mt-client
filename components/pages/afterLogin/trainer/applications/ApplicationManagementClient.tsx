"use client";

import { useState } from "react";
import usePendingApplications from "@/hooks/afterLogin/applications/usePendingApplications";
import useUpdateApplicationStatus from "@/hooks/afterLogin/applications/useUpdateApplicationStatus";
import { ApplicationList } from "./ApplicationList";
import { RejectModal } from "./RejectModal";
import { ApprovalConfirmModal } from "./ApprovalConfirmModal";
import { DogDetailModal } from "./DogDetailModal";
import type { PendingApplication } from "@/types/applications/applicationType";

export const ApplicationManagementClient = () => {
  const { data: applications, isPending, isError } = usePendingApplications();
  const { mutate: updateStatus } = useUpdateApplicationStatus();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [dogDetailModalOpen, setDogDetailModalOpen] = useState(false);
  const [targetDogName, setTargetDogName] = useState("");
  const [selectedApplication, setSelectedApplication] =
    useState<PendingApplication | null>(null);

  // 개별 항목 선택/해제
  const handleToggle = (applicationId: number) => {
    setSelectedIds((prev) =>
      prev.includes(applicationId)
        ? prev.filter((id) => id !== applicationId)
        : [...prev, applicationId]
    );
  };

  // 카드 클릭 시 반려견 정보 모달 열기
  const handleCardClick = (application: PendingApplication) => {
    setSelectedApplication(application);
    setDogDetailModalOpen(true);
  };

  // 모달에서 선택 버튼 클릭
  const handleSelectFromModal = () => {
    if (!selectedApplication) return;
    handleToggle(selectedApplication.applicationId);
    setDogDetailModalOpen(false);
    setSelectedApplication(null);
  };

  // 거절 버튼 클릭
  const handleRejectClick = () => {
    if (selectedIds.length === 0) return;

    // 첫 번째 선택된 항목의 강아지 이름 가져오기
    const firstApplication = applications.find(
      (app) => app.applicationId === selectedIds[0]
    );
    if (firstApplication) {
      setTargetDogName(firstApplication.dogName);
      setRejectModalOpen(true);
    }
  };

  // 거절 확인
  const handleRejectConfirm = async (reason: string) => {
    for (const id of selectedIds) {
      updateStatus({
        applicationId: id,
        data: { status: "REJECTED", rejectReason: reason },
      });
    }
    setRejectModalOpen(false);
    setSelectedIds([]);
  };

  // 승인 버튼 클릭
  const handleApprovalClick = () => {
    if (selectedIds.length === 0) return;
    setApprovalModalOpen(true);
  };

  // 승인 확인
  const handleApprovalConfirm = async () => {
    for (const id of selectedIds) {
      updateStatus({
        applicationId: id,
        data: { status: "ACCEPT" },
      });
    }
    setApprovalModalOpen(false);
    setSelectedIds([]);
  };

  if (isPending) {
    return (
      <div className="w-full px-4 pt-6">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full px-4 pt-6 space-y-2">
        <div className="text-red-500">목록을 불러오는데 실패했습니다.</div>
        <div className="text-sm text-gray-400">잠시 후 다시 시도해주세요.</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4">
      {/* 헤더 */}
      <div className="mb-3">
        <h1 className="text-xl font-bold text-gray-900">승인 대기 목록</h1>
        {selectedIds.length > 0 && (
          <div className="mt-2 text-sm text-blue-600">
            {selectedIds.length}건 선택됨
          </div>
        )}
      </div>

      {/* 목록 */}
      <ApplicationList
        applications={applications}
        selectedIds={selectedIds}
        onToggle={handleToggle}
        onCardClick={handleCardClick}
      />

      {/* 하단 버튼 */}
      {applications.length > 0 && (
        <div className="sticky bottom-2 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
          <div className="w-full px-4 flex gap-3">
            <button
              onClick={handleRejectClick}
              disabled={selectedIds.length === 0}
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              거절
            </button>
            <button
              onClick={handleApprovalClick}
              disabled={selectedIds.length === 0}
              className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              승인
            </button>
          </div>
        </div>
      )}

      {/* 모달들 */}
      <DogDetailModal
        isOpen={dogDetailModalOpen}
        applicationId={selectedApplication?.applicationId || null}
        onClose={() => {
          setDogDetailModalOpen(false);
          setSelectedApplication(null);
        }}
        onSelect={handleSelectFromModal}
      />

      <RejectModal
        isOpen={rejectModalOpen}
        dogName={targetDogName}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={handleRejectConfirm}
      />

      <ApprovalConfirmModal
        isOpen={approvalModalOpen}
        count={selectedIds.length}
        onClose={() => setApprovalModalOpen(false)}
        onConfirm={handleApprovalConfirm}
      />
    </div>
  );
};
