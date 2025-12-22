"use client";

import React from "react";
import CourseCard from "@/components/shared/cards/CourseCard";
import WishlistButton from "./WishlistActionButton";
import Image from "next/image";
import DogImage from "@/public/images/application/dog.jpg";
import TypeImage from "@/public/images/application/repeat.jpg";
import LessonformImage from "@/public/images/application/check.jpg";
import SessionNoImage from "@/public/images/application/star.jpg";

interface WishlistItemProps {
  wishlistItemId: number;
  title: string;
  description: string;
  tags?: string;
  location?: string;
  schedule?: string;
  mainImage?: string;
  dogName: string;
  type: string;
  price: number;
  lessonForm: string;
}

const WishlistCard: React.FC<WishlistItemProps> = ({
  wishlistItemId,
  title,
  description,
  tags,
  location,
  schedule,
  mainImage,
  dogName,
  type,
  price,
  lessonForm,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2">
      {/* CourseCard */}
      <CourseCard
        title={title}
        description={description}
        tags={tags ? tags.split(",") : []} // 쉼표로 나누어 배열로 전달
        location={location}
        sessionSchedule={schedule}
        mainImage={mainImage}
      />

      {/* 추가 정보 */}
      <div className="flex justify-between items-center mt-2 px-2">
        <span className="flex gap-1 text-xs items-center leading-none px-1.5 py-0.5 rounded-full">
          <Image
            src={TypeImage}
            alt="타입"
            width={13}
            height={5}
            className="w-3.5 h-3.75 items-center"
          />
          {type}
        </span>
        <span className="flex gap-1 text-xs items-center leading-none px-1.5 py-0.5 rounded-full">
          <Image
            src={LessonformImage}
            alt="lessonform"
            width={13}
            height={5}
            className="w-3.5 h-3.75 items-center"
          />
          {lessonForm}
        </span>
      </div>
      <div>
        <p className="text-sm text-gray-500">강아지: {dogName}</p>
      </div>
      <p className="font-semibold">{price.toLocaleString()}원</p>
    </div>
  );
};

export default WishlistCard;
