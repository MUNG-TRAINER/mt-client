"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { trainerUserApi } from "@/apis/trainer/trainerUserApi";
import { DogIcon } from "@/components/icons/dog";
import { CalendarIcon } from "@/components/icons/calendar";
import Image from "next/image";

export default function DogStatsPage() {
  const router = useRouter();
  const params = useParams();
  const dogId = Number(params.dogId);

  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dogStats", dogId],
    queryFn: () => trainerUserApi.getDogStats(dogId),
    enabled: !!dogId,
  });

  if (isLoading) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p className="text-(--mt-gray)">로딩 중...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col items-center justify-center gap-4">
        <p className="text-(--mt-gray)">반려견 정보를 불러올 수 없습니다.</p>
        <button
          onClick={() => router.back()}
          className="py-2 px-6 bg-(--mt-blue-point) text-(--mt-white) rounded-xl font-bold"
        >
          돌아가기
        </button>
      </div>
    );
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "ONGOING":
        return "bg-blue-100 text-blue-700";
      case "CANCELLED":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "완료됨";
      case "ONGOING":
        return "진행중";
      case "CANCELLED":
        return "취소됨";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-3 overflow-y-auto">
      {/* 반려견 프로필 */}
      <div className="flex flex-col items-center gap-2">
        {stats.imageUrl && stats.imageUrl.trim() ? (
          <div className="relative size-30 rounded-full overflow-hidden">
            <Image
              src={stats.imageUrl}
              alt={stats.dogName}
              fill
              sizes="120px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div
            className="flex items-center justify-center relative size-30 rounded-full overflow-hidden"
            style={{
              backgroundColor: `hsl(${(stats.dogId * 137.5) % 360}, 70%, 80%)`,
            }}
          >
            <DogIcon className="size-16 text-white" />
          </div>
        )}
        <h2 className="font-bold text-2xl text-(--mt-black)">
          {stats.dogName}
        </h2>
        <p className="text-sm text-(--mt-gray)">보호자: {stats.ownerName}</p>
      </div>

      {/* 반려견 정보 */}
      <div className="flex flex-col gap-3 [&>div>span]:border [&>div>span]:border-(--mt-gray-light) [&>div>span]:p-2 [&>div>span]:rounded-md [&>div>h3]:font-bold [&>div>h3]:text-(--mt-black)">
        <div className="flex flex-col gap-2">
          <h3>견종</h3>
          <span>{stats.breed}</span>

          <h3>나이</h3>
          <span>{stats.age}살</span>

          <h3>보호자 연락처</h3>
          <span>{stats.ownerPhone}</span>
        </div>
      </div>

      {/* 상담 내용 */}
      {stats.specialNotes && (
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-(--mt-black)">상담 내용</h3>
          <div className="border border-(--mt-gray-light) p-3 rounded-md whitespace-pre-wrap text-sm">
            {stats.specialNotes}
          </div>
        </div>
      )}

      {/* 행동 문제 */}
      {stats.behaviorIssues && stats.behaviorIssues.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-(--mt-black)">행동 문제</h3>
          <div className="flex flex-wrap gap-2">
            {stats.behaviorIssues.map((issue, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
              >
                {issue}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 수강 훈련 내역 */}
      {stats.recentTrainings && stats.recentTrainings.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-(--mt-black)">수강 훈련 내역</h3>
          <div className="space-y-3">
            {stats.recentTrainings.map((training) => (
              <div
                key={training.trainingId}
                className="border border-(--mt-gray-light) rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-base font-bold text-(--mt-black) flex-1">
                    {training.courseName}
                  </h4>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-2 ${getStatusBadgeColor(
                      training.status
                    )}`}
                  >
                    {getStatusLabel(training.status)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-(--mt-gray) mb-3">
                  <CalendarIcon className="size-4" />
                  <span>
                    {training.startDate} ~ {training.endDate}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-(--mt-gray-light)">
                  <span className="text-sm text-(--mt-gray)">출석률</span>
                  <span className="text-lg font-bold text-(--mt-blue-point)">
                    {training.attendanceRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 통계 카드들 */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        <StatCard label="전체 훈련" value={`${stats.totalTrainingCount}회`} />
        <StatCard
          label="완료된 훈련"
          value={`${stats.completedTrainingCount}회`}
        />
        <StatCard
          label="진행 중인 훈련"
          value={`${stats.ongoingTrainingCount}회`}
        />
        <StatCard label="출석률" value={`${stats.attendanceRate}%`} highlight />
      </div>

      {/* 돌아가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="border border-(--mt-gray-light) text-(--mt-gray) py-3 rounded-xl font-bold mt-2"
      >
        돌아가기
      </button>
    </div>
  );
}

// 정보 행 컴포넌트
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-(--mt-black)">{value}</span>
    </div>
  );
}

// 통계 카드 컴포넌트
function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        highlight
          ? "bg-gradient-to-br from-(--mt-blue-point) to-blue-600 text-white"
          : "border border-(--mt-gray-light)"
      }`}
    >
      <p
        className={`text-xs mb-1.5 ${
          highlight ? "text-blue-100" : "text-(--mt-gray)"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-xl font-bold ${
          highlight ? "text-white" : "text-(--mt-black)"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
