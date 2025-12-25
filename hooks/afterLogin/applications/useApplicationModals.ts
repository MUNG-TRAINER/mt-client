"use client";
import {useState} from "react";
import type {GroupedApplication} from "@/types/applications/applicationType";

/**
 * 신청 관리 모달 상태 관리 훅
 */
export function useApplicationModals() {
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [dogDetailModalOpen, setDogDetailModalOpen] = useState(false);
  const [targetDogName, setTargetDogName] = useState("");
  const [selectedApplication, setSelectedApplication] =
    useState<GroupedApplication | null>(null);

  const openRejectModal = (dogName: string) => {
    setTargetDogName(dogName);
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
  };

  const openApprovalModal = () => {
    setApprovalModalOpen(true);
  };

  const closeApprovalModal = () => {
    setApprovalModalOpen(false);
  };

  const openDogDetailModal = (application: GroupedApplication) => {
    setSelectedApplication(application);
    setDogDetailModalOpen(true);
  };

  const closeDogDetailModal = () => {
    setDogDetailModalOpen(false);
    setSelectedApplication(null);
  };

  return {
    // Reject Modal
    rejectModalOpen,
    targetDogName,
    openRejectModal,
    closeRejectModal,
    // Approval Modal
    approvalModalOpen,
    openApprovalModal,
    closeApprovalModal,
    // Dog Detail Modal
    dogDetailModalOpen,
    selectedApplication,
    openDogDetailModal,
    closeDogDetailModal,
  };
}
