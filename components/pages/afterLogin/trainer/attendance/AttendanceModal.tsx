"use client";

import { useEffect, useRef } from "react";
import { useAttendanceModal } from "@/hooks/afterLogin/trainer/useAttendanceModal";
import { useFocusTrap } from "@/hooks/afterLogin/trainer/useFocusTrap";
import AttendanceItem from "./AttendanceItem";

interface AttendanceModalProps {
  isOpen: boolean;
  courseId: number;
  sessionId: number;
  sessionNo: number;
  onClose: () => void;
  isEditable?: boolean; // 편집 가능 여부 (예정된 훈련 = true, 완료된 훈련 = false)
}

export default function AttendanceModal({
  isOpen,
  courseId,
  sessionId,
  sessionNo,
  onClose,
  isEditable = true,
}: AttendanceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 출석 데이터 관리
  const { attendanceList, loading, handleToggleAttendance, stats } =
    useAttendanceModal({
      isOpen,
      courseId,
      sessionId,
      isEditable,
    });

  // 포커스 트랩
  useFocusTrap({ isOpen, modalRef, closeButtonRef });

  // Escape 키로 모달 닫기 (키보드 접근성)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="attendance-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2
            id="attendance-modal-title"
            className="text-lg font-bold text-(--mt-black)"
          >
            {sessionNo}회차 {isEditable ? "출석체크" : "출석현황"}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="닫기"
          >
            <svg
              className="w-6 h-6"
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
          </button>
        </div>

        {/* Stats */}
        {!isEditable && (
          <div className="p-5 bg-gray-50 border-b border-gray-200">
            <div className="text-center text-sm text-gray-600">
              총{" "}
              <span className="font-bold text-(--mt-blue-point)">
                {stats.attended}
              </span>
              명 출석 / {stats.total}명
            </div>
          </div>
        )}

        {/* Attendance List */}
        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <div className="text-center py-10 text-gray-500">로딩 중...</div>
          ) : attendanceList.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              출석 정보가 없습니다.
            </div>
          ) : (
            <div className="space-y-3">
              {attendanceList.map((attendance) => (
                <AttendanceItem
                  key={attendance.attendanceId}
                  attendance={attendance}
                  onToggle={handleToggleAttendance}
                  isEditable={isEditable}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-(--mt-blue-point) text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
