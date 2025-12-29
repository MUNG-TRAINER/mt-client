"use client";
import { useState, useEffect, useRef } from "react";
import { attendanceAPI } from "@/apis/trainer/attendanceApi";
import {
  AttendanceType,
  AttendanceStatus,
} from "@/types/trainer/attendanceType";

interface UseAttendanceModalProps {
  isOpen: boolean;
  courseId: number;
  sessionId: number;
  isEditable: boolean;
}

export function useAttendanceModal({
  isOpen,
  courseId,
  sessionId,
  isEditable,
}: UseAttendanceModalProps) {
  const [attendanceList, setAttendanceList] = useState<AttendanceType[]>([]);
  const [loading, setLoading] = useState(false);
  const loadedSessionRef = useRef<{
    courseId: number;
    sessionId: number;
  } | null>(null);
  const loadingRef = useRef(false);

  // 출석 목록 로드
  useEffect(() => {
    const loadAttendanceList = async () => {
      if (!isOpen) return;

      // 이미 로딩 중이면 중복 요청 방지
      if (loadingRef.current) return;

      // 동일한 세션의 데이터가 이미 로드되어 있으면 재사용
      const loadedSession = loadedSessionRef.current;
      if (
        loadedSession &&
        loadedSession.courseId === courseId &&
        loadedSession.sessionId === sessionId
      ) {
        return;
      }

      loadingRef.current = true;
      setLoading(true);
      try {
        const data = await attendanceAPI.getAttendanceList(courseId, sessionId);
        setAttendanceList(data);
        loadedSessionRef.current = { courseId, sessionId };
      } catch {
        alert("출석 목록을 불러오는데 실패했습니다.");
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    };

    loadAttendanceList();
  }, [isOpen, courseId, sessionId]);

  // 출석 토글 핸들러 (낙관적 업데이트)
  const handleToggleAttendance = async (
    attendanceId: number,
    currentStatus: AttendanceStatus
  ) => {
    if (!isEditable) return;

    const newStatus: AttendanceStatus =
      currentStatus === "ATTENDED" ? "ABSENT" : "ATTENDED";

    // 낙관적 업데이트: 로컬 상태 먼저 변경
    setAttendanceList((prevList) =>
      prevList.map((attendance) =>
        attendance.attendanceId === attendanceId
          ? { ...attendance, status: newStatus }
          : attendance
      )
    );

    try {
      // API 호출
      await attendanceAPI.updateAttendanceStatus(
        courseId,
        sessionId,
        attendanceId,
        { status: newStatus }
      );
    } catch {
      // 실패 시 롤백
      setAttendanceList((prevList) =>
        prevList.map((attendance) =>
          attendance.attendanceId === attendanceId
            ? { ...attendance, status: currentStatus }
            : attendance
        )
      );
      alert("출석 상태 변경에 실패했습니다.");
    }
  };

  // 통계 계산
  const stats = {
    total: attendanceList.length,
    attended: attendanceList.filter((a) => a.status === "ATTENDED").length,
  };

  return {
    attendanceList,
    loading,
    handleToggleAttendance,
    stats,
  };
}
