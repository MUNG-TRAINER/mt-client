import Image from "next/image";
import { DogIcon } from "@/components/icons/dog";
import ToggleSlide from "@/components/shared/toggleSlide/ToggleSlide";
import {
  AttendanceType,
  ATTENDANCE_STATUS_COLOR,
  ATTENDANCE_STATUS_LABEL,
  AttendanceStatus,
} from "@/types/trainer/attendanceType";

interface AttendanceItemProps {
  attendance: AttendanceType;
  onToggle: (userName: string, currentStatus: AttendanceStatus) => void;
  isEditable: boolean;
}

export default function AttendanceItem({
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
          {/* 반려견 프로필 이미지 */}
          <div className="size-12 rounded-full overflow-hidden flex items-center justify-center shrink-0">
            {attendance.dogProfileImage ? (
              <Image
                src={attendance.dogProfileImage}
                alt={attendance.dogName}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="flex items-center justify-center size-12 rounded-full"
                style={{
                  backgroundColor: `hsl(${
                    (attendance.attendanceId * 137.5) % 360
                  }, 70%, 80%)`,
                }}
              >
                <DogIcon className="size-6 text-white" />
              </div>
            )}
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
            {ATTENDANCE_STATUS_LABEL[attendance.status]}
          </span>
        )}
      </div>
    </div>
  );
}
