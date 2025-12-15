"use client";
import Image from "next/image";
import { useState } from "react";
import { IDogProfileType } from "@/types/dog/dogType";
import Link from "next/link";

interface IDogProfileCardProps {
  dog: IDogProfileType;
  showActions?: boolean;
  onDelete?: (dogId: number) => void;
}

export default function DogProfileCard({
  dog,
  showActions = false,
  onDelete,
}: IDogProfileCardProps) {
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

  const handleDelete = () => {
    if (onDelete && confirm(`${dog.name}의 프로필을 삭제하시겠습니까?`)) {
      onDelete(dog.dogId);
    }
  };

  return (
    <article className="p-4 bg-(--mt-gray-light) rounded-2xl flex flex-col gap-3">
      <div className="flex gap-4 items-start">
        {/* 프로필 이미지 */}
        <div className="overflow-hidden size-20 rounded-full relative flex-shrink-0">
          {dog.profileImage ? (
            <Image
              src={dog.profileImage}
              alt={dog.name}
              width={80}
              height={80}
              className="object-cover"
            />
          ) : (
            <div className={`${bgClass[randomInt]} size-20 rounded-full`} />
          )}
        </div>

        {/* 기본 정보 */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-2xl font-bold">{dog.name}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                dog.gender === "M"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-pink-100 text-pink-700"
              }`}
            >
              {dog.gender === "M" ? "남" : "여"}
            </span>
            {dog.isNeutered && (
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                중성화
              </span>
            )}
          </div>
          <div className="text-sm text-(--mt-gray) space-y-1">
            <p>
              <span className="font-semibold">견종:</span> {dog.breed}
            </p>
            <p>
              <span className="font-semibold">나이:</span> {dog.age}살
            </p>
            <p>
              <span className="font-semibold">체중:</span> {dog.weight}kg
            </p>
          </div>
        </div>
      </div>

      {/* 상세 정보 */}
      {/* <div className="space-y-2 text-sm">
        {dog.personality && (
          <div>
            <p className="font-semibold text-(--mt-black)">성격</p>
            <p className="text-(--mt-gray)">{dog.personality}</p>
          </div>
        )}
        {dog.habits && (
          <div>
            <p className="font-semibold text-(--mt-black)">습관/특징</p>
            <p className="text-(--mt-gray)">{dog.habits}</p>
          </div>
        )}
        {dog.healthInfo && (
          <div>
            <p className="font-semibold text-(--mt-black)">건강 정보</p>
            <p className="text-(--mt-gray)">{dog.healthInfo}</p>
          </div>
        )}
      </div> */}

      {/* 액션 버튼 */}
      {/* {showActions && (
        <div className="flex gap-2 mt-2">
          <Link
            href={`/mydogs/${dog.dogId}/edit`}
            className="flex-1 py-2 text-center bg-(--mt-blue-point) rounded-xl text-(--mt-white) font-bold shadow-md"
          >
            수정
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 py-2 text-center border border-red-500 text-red-500 rounded-xl font-bold"
          >
            삭제
          </button>
        </div>
      )} */}
    </article>
  );
}
