"use client";
import Image from "next/image";
import Link from "next/link";
import { IUserCounselingListItemType } from "@/types/counseling/counselingType";
import { ChevronRightIcon } from "@/components/icons/chevron";
import { DogIcon } from "@/components/icons/dog";
import { formatDateTime } from "@/util/time/formatDate";

interface ICounselingCardProps {
  counseling: IUserCounselingListItemType;
}

export default function CounselingCard({ counseling }: ICounselingCardProps) {
  return (
    <Link href={`/counseling/${counseling.counselingId}`}>
      <article className="p-4 bg-gray-100 rounded-2xl flex items-center gap-3 hover:bg-gray-200 transition-colors cursor-pointer">
        {/* 반려견 프로필 이미지 */}
        <div className="overflow-hidden size-16 rounded-full relative shrink-0">
          {counseling.dogImage && counseling.dogImage.trim() ? (
            <Image
              src={counseling.dogImage}
              alt={counseling.dogName}
              fill
              sizes="64px"
              className="object-cover"
              priority
            />
          ) : (
            <div
              className="flex items-center justify-center size-16 rounded-full"
              style={{
                backgroundColor: `hsl(${
                  (counseling.dogId * 137.5) % 360
                }, 70%, 80%)`,
              }}
            >
              <DogIcon className="size-8 text-white" />
            </div>
          )}
        </div>

        {/* 상담 정보 */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-(--mt-black)">
              {counseling.dogName}
            </h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                counseling.isCompleted
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {counseling.isCompleted ? "상담 완료" : "대기 중"}
            </span>
          </div>
          <p className="text-sm text-(--mt-gray)">
            {formatDateTime(counseling.createdAt)}
          </p>
          {counseling.isCompleted && counseling.content && (
            <p className="text-sm text-(--mt-gray) mt-1 line-clamp-1">
              {counseling.content}
            </p>
          )}
        </div>

        {/* 화살표 아이콘 */}
        <ChevronRightIcon className="size-6 text-(--mt-gray) flex-shrink-0" />
      </article>
    </Link>
  );
}
