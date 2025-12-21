"use client";

import useGroupedApplications from "@/hooks/afterLogin/applications/useGroupedApplications";
import { useApplicationSelection } from "@/hooks/afterLogin/applications/useApplicationSelection";
import { useApplicationModals } from "@/hooks/afterLogin/applications/useApplicationModals";
import { useApplicationBulkActions } from "@/hooks/afterLogin/applications/useApplicationBulkActions";
import { ApplicationList } from "./ApplicationList";
import { RejectModal } from "./RejectModal";
import { ApprovalConfirmModal } from "./ApprovalConfirmModal";
import { DogDetailModal } from "./DogDetailModal";
import type { GroupedApplication } from "@/types/applications/applicationType";

export const ApplicationManagementClient = () => {
  const { data: applications, isPending, isError } = useGroupedApplications();
  const { selectedItems, toggleSelection, clearSelection } =
    useApplicationSelection();
  const {
    rejectModalOpen,
    targetDogName,
    openRejectModal,
    closeRejectModal,
    approvalModalOpen,
    openApprovalModal,
    closeApprovalModal,
    dogDetailModalOpen,
    selectedApplication,
    openDogDetailModal,
    closeDogDetailModal,
  } = useApplicationModals();
  const { handleBulkApprove, handleBulkReject } = useApplicationBulkActions();

  // 카드 클릭 시 반려견 정보 모달 열기
  const handleCardClick = (application: GroupedApplication) => {
    openDogDetailModal(application);
  };

  // 모달에서 선택 버튼 클릭
  const handleSelectFromModal = () => {
    if (!selectedApplication) return;
    toggleSelection(selectedApplication.courseId, selectedApplication.dogId);
    closeDogDetailModal();
  };

  // 거절 버튼 클릭
  const handleRejectClick = () => {
    if (selectedItems.size === 0) return;

    const firstKey = Array.from(selectedItems)[0];
    const [courseId, dogId] = firstKey.split("-").map(Number);
    const firstApplication = applications.find(
      (app) => app.courseId === courseId && app.dogId === dogId
    );
    if (firstApplication) {
      openRejectModal(firstApplication.dogName);
    }
  };

  // 거절 확인
  const handleRejectConfirm = async (reason: string) => {
    const result = await handleBulkReject(selectedItems, reason);

    // 성공한 항목만 선택 해제
    result.succeeded.forEach((key) => {
      const [courseId, dogId] = key.split("-").map(Number);
      toggleSelection(courseId, dogId);
    });

    closeRejectModal();

    // 결과 피드백
    if (result.failed.length === 0) {
      alert(`${result.succeeded.length}건이 거절되었습니다.`);
    } else if (result.succeeded.length === 0) {
      alert(
        `거절에 실패했습니다. (실패: ${result.failed.length}건)\n다시 시도해주세요.`
      );
    } else {
      alert(
        `일부 처리되었습니다.\n성공: ${result.succeeded.length}건\n실패: ${result.failed.length}건\n\n실패한 항목은 선택된 상태로 유지됩니다.`
      );
    }
  };

  // 승인 버튼 클릭
  const handleApprovalClick = () => {
    if (selectedItems.size === 0) return;
    openApprovalModal();
  };

  // 승인 확인
  const handleApprovalConfirm = async () => {
    const result = await handleBulkApprove(selectedItems);

    // 성공한 항목만 선택 해제
    result.succeeded.forEach((key) => {
      const [courseId, dogId] = key.split("-").map(Number);
      toggleSelection(courseId, dogId);
    });

    closeApprovalModal();

    // 결과 피드백
    if (result.failed.length === 0) {
      alert(`${result.succeeded.length}건이 승인되었습니다.`);
    } else if (result.succeeded.length === 0) {
      alert(
        `승인에 실패했습니다. (실패: ${result.failed.length}건)\n다시 시도해주세요.`
      );
    } else {
      alert(
        `일부 처리되었습니다.\n성공: ${result.succeeded.length}건\n실패: ${result.failed.length}건\n\n실패한 항목은 선택된 상태로 유지됩니다.`
      );
    }
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
        onToggle={toggleSelection}
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
        applicationId={
          selectedApplication?.sessions?.[0]?.applicationId || null
        }
        onClose={closeDogDetailModal}
        onSelect={handleSelectFromModal}
      />

      <RejectModal
        isOpen={rejectModalOpen}
        dogName={targetDogName}
        onClose={closeRejectModal}
        onConfirm={handleRejectConfirm}
      />

      <ApprovalConfirmModal
        isOpen={approvalModalOpen}
        count={selectedItems.size}
        onClose={closeApprovalModal}
        onConfirm={handleApprovalConfirm}
      />
    </div>
  );
};
