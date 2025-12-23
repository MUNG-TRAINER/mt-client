import { InfoCard } from "./InfoCard";
import type { IDogStatsResponse } from "@/types/trainer/trainerUserType";

interface DogBasicInfoProps {
  dog: IDogStatsResponse["dog"];
}

export function DogBasicInfo({ dog }: DogBasicInfoProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <InfoCard label="견종" value={dog.breed} />
        <InfoCard label="나이" value={`${dog.age}세`} />
        <InfoCard label="성별" value={dog.gender === "M" ? "남 ♂" : "여 ♀"} />
        <InfoCard
          label="체중"
          value={dog.weight ? `${dog.weight}kg` : "미입력"}
        />
        <InfoCard label="중성화" value={dog.isNeutered ? "완료" : "미완료"} />
        <InfoCard
          label="등록일"
          value={new Date(dog.createdAt).toLocaleDateString("ko-KR")}
        />
        <InfoCard
          label="사람 사회화"
          value={
            dog.humanSocialization === "HIGH"
              ? "높음"
              : dog.humanSocialization === "MEDIUM"
              ? "보통"
              : "낮음"
          }
        />
        <InfoCard
          label="동물 사회화"
          value={
            dog.animalSocialization === "HIGH"
              ? "높음"
              : dog.animalSocialization === "MEDIUM"
              ? "보통"
              : "낮음"
          }
        />
      </div>

      {(dog.personality || dog.habits || dog.healthInfo) && (
        <div className="space-y-2 mt-2">
          {dog.personality && (
            <div className="border border-(--mt-gray-light) p-3 rounded-md">
              <h4 className="text-sm font-bold text-(--mt-black) mb-1">성격</h4>
              <p className="text-sm text-(--mt-gray)">{dog.personality}</p>
            </div>
          )}
          {dog.habits && (
            <div className="border border-(--mt-gray-light) p-3 rounded-md">
              <h4 className="text-sm font-bold text-(--mt-black) mb-1">습관</h4>
              <p className="text-sm text-(--mt-gray)">{dog.habits}</p>
            </div>
          )}
          {dog.healthInfo && (
            <div className="border border-(--mt-gray-light) p-3 rounded-md">
              <h4 className="text-sm font-bold text-(--mt-black) mb-1">
                건강 정보
              </h4>
              <p className="text-sm text-(--mt-gray)">{dog.healthInfo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
