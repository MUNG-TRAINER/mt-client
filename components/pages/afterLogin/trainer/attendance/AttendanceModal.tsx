"use client";

import { useEffect, useState } from "react";
import { attendanceAPI } from "@/apis/trainer/attendanceApi";
import {
  AttendanceType,
  ATTENDANCE_STATUS_COLOR,
} from "@/types/trainer/attendanceType";
import ToggleSlide from "@/components/shared/toggleSlide/ToggleSlide";

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
  const [attendanceList, setAttendanceList] = useState<AttendanceType[]>([]);
  const [loading, setLoading] = useState(false);

  // 출석 목록 로드
  useEffect(() => {
    const loadAttendanceList = async () => {
      if (!isOpen) return;
      setLoading(true);
      try {
        const data = await attendanceAPI.getAttendanceList(courseId, sessionId);
        setAttendanceList(data);
      } catch {
        alert("출석 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadAttendanceList();
  }, [isOpen, courseId, sessionId]);

  // 출석 토글 핸들러
  const handleToggleAttendance = async (
    userName: string,
    currentStatus: string
  ) => {
    if (!isEditable) return;

    const newStatus = currentStatus === "ATTENDED" ? "ABSENT" : "ATTENDED";
    try {
      await attendanceAPI.updateAttendanceStatus(
        courseId,
        sessionId,
        userName,
        { status: newStatus }
      );
      // 목록 새로고침
      const data = await attendanceAPI.getAttendanceList(courseId, sessionId);
      setAttendanceList(data);
    } catch {
      alert("출석 상태 변경에 실패했습니다.");
    }
  };

  // 통계 계산
  const stats = {
    total: attendanceList.length,
    attended: attendanceList.filter((a) => a.status === "ATTENDED").length,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-bold text-(--mt-black)">
            {sessionNo}회차 {isEditable ? "출석체크" : "출석현황"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
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

// 출석 아이템 컴포넌트
interface AttendanceItemProps {
  attendance: AttendanceType;
  onToggle: (userName: string, currentStatus: string) => void;
  isEditable: boolean;
}

function AttendanceItem({
  attendance,
  onToggle,
  isEditable,
}: AttendanceItemProps) {
  const isAttended = attendance.status === "ATTENDED";
  const statusColor = isAttended
    ? ATTENDANCE_STATUS_COLOR.ATTENDED
    : ATTENDANCE_STATUS_COLOR.ABSENT;

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-(--mt-black)">
              {attendance.dogName}
            </div>
            <div className="text-sm text-gray-500">
              보호자: {attendance.userName}
            </div>
          </div>
        </div>

        {isEditable ? (
          <ToggleSlide
            toggleState={isAttended}
            toggleFn={() => onToggle(attendance.userName, attendance.status)}
            barWidth={48}
            barHeight={24}
          />
        ) : (
          <span
            className="px-3 py-1 rounded-full text-white text-sm font-medium"
            style={{ backgroundColor: statusColor }}
          >
            {isAttended ? "출석" : "결석"}
          </span>
        )}
      </div>
    </div>
  );
}
