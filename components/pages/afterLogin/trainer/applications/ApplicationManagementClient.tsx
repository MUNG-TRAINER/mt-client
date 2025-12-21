"use client";

import { useState } from "react";
import useGroupedApplications from "@/hooks/afterLogin/applications/useGroupedApplications";
import useBulkUpdateStatus from "@/hooks/afterLogin/applications/useBulkUpdateStatus";
import { ApplicationList } from "./ApplicationList";
import { RejectModal } from "./RejectModal";
import { ApprovalConfirmModal } from "./ApprovalConfirmModal";
import { DogDetailModal } from "./DogDetailModal";
import type { GroupedApplication } from "@/types/applications/applicationType";

export const ApplicationManagementClient = () => {
  const { data: applications, isPending, isError } = useGroupedApplications();
  const { mutate: bulkUpdateStatus } = useBulkUpdateStatus();

  // selectedItems는 "courseId-dogId" 형태의 문자열을 저장
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [dogDetailModalOpen, setDogDetailModalOpen] = useState(false);
  const [targetDogName, setTargetDogName] = useState("");
  const [selectedApplication, setSelectedApplication] =
    useState<GroupedApplication | null>(null);

  // 개별 항목 선택/해제
  const handleToggle = (courseId: number, dogId: number) => {
    const key = `${courseId}-${dogId}`;
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  // 카드 클릭 시 반려견 정보 모달 열기
  const handleCardClick = (application: GroupedApplication) => {
    setSelectedApplication(application);
    setDogDetailModalOpen(true);
  };

  // 모달에서 선택 버튼 클릭
  const handleSelectFromModal = () => {
    if (!selectedApplication) return;
    handleToggle(selectedApplication.courseId, selectedApplication.dogId);
    setDogDetailModalOpen(false);
    setSelectedApplication(null);
  };

  // 거절 버튼 클릭
  const handleRejectClick = () => {
    if (selectedItems.size === 0) return;

    // 첫 번째 선택된 항목의 강아지 이름 가져오기
    const firstKey = Array.from(selectedItems)[0];
    const [courseId, dogId] = firstKey.split("-").map(Number);
    const firstApplication = applications.find(
      (app) => app.courseId === courseId && app.dogId === dogId
    );
    if (firstApplication) {
      setTargetDogName(firstApplication.dogName);
      setRejectModalOpen(true);
    }
  };

  // 거절 확인
  const handleRejectConfirm = async (reason: string) => {
    for (const key of selectedItems) {
      const [courseId, dogId] = key.split("-").map(Number);
      bulkUpdateStatus({
        courseId,
        dogId,
        data: { status: "REJECTED", rejectReason: reason },
      });
    }
    setRejectModalOpen(false);
    setSelectedItems(new Set());
  };

  // 승인 버튼 클릭
  const handleApprovalClick = () => {
    if (selectedItems.size === 0) return;
    setApprovalModalOpen(true);
  };

  // 승인 확인
  const handleApprovalConfirm = async () => {
    for (const key of selectedItems) {
      const [courseId, dogId] = key.split("-").map(Number);
      bulkUpdateStatus({
        courseId,
        dogId,
        data: { status: "ACCEPT" },
      });
    }
    setApprovalModalOpen(false);
    setSelectedItems(new Set());
  };

  if (isPending) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="space-y-2 text-center">
          <div className="text-red-500">목록을 불러오는데 실패했습니다.</div>
          <div className="text-sm text-gray-400">
            잠시 후 다시 시도해주세요.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4">
      {/* 헤더 */}
      <div className="mb-3">
        <h1 className="text-xl font-bold text-gray-900">승인 대기 목록</h1>
        {selectedItems.size > 0 && (
          <div className="mt-2 text-sm text-blue-600">
            {selectedItems.size}건 선택됨
          </div>
        )}
      </div>

      {/* 목록 */}
      <ApplicationList
        applications={applications}
        selectedItems={selectedItems}
        onToggle={handleToggle}
        onCardClick={handleCardClick}
      />

      {/* 하단 버튼 */}
      {applications.length > 0 && (
        <div className="sticky bottom-2 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
          <div className="w-full px-4 flex gap-3">
            <button
              onClick={handleRejectClick}
              disabled={selectedItems.size === 0}
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              거절
            </button>
            <button
              onClick={handleApprovalClick}
              disabled={selectedItems.size === 0}
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
        applicationId={selectedApplication?.sessions[0]?.applicationId || null}
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
        count={selectedItems.size}
        onClose={() => setApprovalModalOpen(false)}
        onConfirm={handleApprovalConfirm}
      />
    </div>
  );
};
