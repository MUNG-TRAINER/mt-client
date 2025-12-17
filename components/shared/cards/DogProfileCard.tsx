"use client";
import Image from "next/image";
import { IDogProfileType } from "@/types/dog/dogType";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons/chevron";
import { DogIcon } from "@/components/icons/dog";

interface IDogProfileCardProps {
  dog: IDogProfileType;
}

export default function DogProfileCard({ dog }: IDogProfileCardProps) {
  return (
    <Link href={`/mydogs/${dog.dogId}`}>
      <article className="p-4 bg-gray-100 rounded-2xl flex items-center gap-3 hover:bg-gray-200 transition-colors cursor-pointer">
        {/* 프로필 이미지 */}
        <div className="overflow-hidden size-16 rounded-full relative flex-shrink-0">
          {dog.profileImage && dog.profileImage.trim() ? (
            <Image
              src={dog.profileImage}
              alt={dog.name}
              fill
              sizes="64px"
              className="object-cover"
              priority
            />
          ) : (
            <div
              className="flex items-center justify-center size-16 rounded-full"
              style={{
                backgroundColor: `hsl(${(dog.dogId * 137.5) % 360}, 70%, 80%)`,
              }}
            >
              <DogIcon className="size-8 text-white" />
            </div>
          )}
        </div>

        {/* 기본 정보 */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-(--mt-black)">{dog.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                dog.gender === "M"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-pink-100 text-pink-700"
              }`}
            >
              {dog.gender === "M" ? "남" : "여"}
            </span>
            <p className="text-sm text-(--mt-gray)">
              {dog.age}살 · {dog.breed}
            </p>
          </div>
        </div>

        {/* 화살표 아이콘 */}
        <ChevronRightIcon className="size-6 text-(--mt-gray) flex-shrink-0" />
      </article>
    </Link>
  );
}
