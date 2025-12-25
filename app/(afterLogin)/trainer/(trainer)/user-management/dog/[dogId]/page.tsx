"use client";

import {useParams, useRouter} from "next/navigation";
import {DogProfile} from "@/components/pages/afterLogin/trainer/dogInfo/DogProfile";
import {DogBasicInfo} from "@/components/pages/afterLogin/trainer/dogInfo/DogBasicInfo";
import {DogStatsCards} from "@/components/pages/afterLogin/trainer/dogInfo/DogStatsCards";
import {CounselingRecords} from "@/components/pages/afterLogin/trainer/counseling/CounselingRecords";
import {TrainingApplicationsList} from "@/components/pages/afterLogin/trainer/courses/TrainingApplicationsList";
import {MultiCoursesList} from "@/components/pages/afterLogin/trainer/courses/MultiCoursesList";
import useGetDogStats from "@/hooks/afterLogin/trainer/useGetDogStats";

export default function DogStatsPage() {
  const router = useRouter();
  const params = useParams();
  const dogId = Number(params.dogId);

  const {statsData, isLoading, error} = useGetDogStats({dogId});

  if (isLoading) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p className="text-(--mt-gray)">로딩 중...</p>
      </div>
    );
  }

  if (error || !statsData) {
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

  const {dog, counselings, stats, trainingApplications, multiCourses} =
    statsData;

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-3 overflow-y-auto">
      <DogProfile dog={dog} />
      <DogBasicInfo dog={dog} />
      <DogStatsCards stats={stats} />
      <CounselingRecords counselings={counselings} />
      <TrainingApplicationsList trainingApplications={trainingApplications} />
      <MultiCoursesList multiCourses={multiCourses} />

      <button
        onClick={() => router.back()}
        className="border border-(--mt-gray-light) text-(--mt-gray) py-3 rounded-xl font-bold mt-2"
      >
        돌아가기
      </button>
    </div>
  );
}
