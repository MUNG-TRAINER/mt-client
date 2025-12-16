"use client";
import Image from "next/image";
import { useState } from "react";
import { IDogProfileType } from "@/types/dog/dogType";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons/chevron";

interface IDogProfileCardProps {
  dog: IDogProfileType;
}

export default function DogProfileCard({ dog }: IDogProfileCardProps) {
  const [randomInt] = useState(() => Math.floor(Math.random() * 10));
  const bgClass = [
    "bg-red-200",
    "bg-orange-200",
    "bg-yellow-200",
    "bg-lime-200",
    "bg-green-200",
    "bg-teal-200",
    "bg-blue-200",
    "bg-sky-200",
    "bg-indigo-200",
    "bg-pink-200",
  ];

  return (
    <Link href={`/mydogs/${dog.dogId}`}>
      <article className="p-4 bg-(--mt-gray-light) rounded-2xl flex items-center gap-3 hover:bg-(--mt-gray) transition-colors cursor-pointer">
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
            <div className={`${bgClass[randomInt]} size-16 rounded-full`} />
          )}
        </div>

        {/* 기본 정보 */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-(--mt-black)">{dog.name}</h3>
          <p className="text-sm text-(--mt-gray)">
            {dog.breed} · {dog.age}살
          </p>
        </div>

        {/* 화살표 아이콘 */}
        <ChevronRightIcon className="size-6 text-(--mt-gray) flex-shrink-0" />
      </article>
    </Link>
  );
}
