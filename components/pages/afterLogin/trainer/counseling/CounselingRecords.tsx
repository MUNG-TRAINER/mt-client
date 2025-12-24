import type { IDogStatsResponse } from "@/types/trainer/trainerUserType";

interface CounselingRecordsProps {
  counselings: IDogStatsResponse["counselings"];
}

export function CounselingRecords({ counselings }: CounselingRecordsProps) {
  if (!counselings || counselings.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-(--mt-black)">상담 기록</h3>
      <div className="space-y-2">
        {counselings.map((counseling) => (
          <div
            key={counseling.counselingId}
            className="border border-(--mt-gray-light) p-3 rounded-md"
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  counseling.isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {counseling.isCompleted ? "완료" : "진행중"}
              </span>
              <span className="text-xs text-(--mt-gray)">
                {new Date(counseling.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </div>
            <p className="text-sm whitespace-pre-wrap">{counseling.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
