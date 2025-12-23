"use client";

import React from "react";
import CourseCard from "@/components/shared/cards/CourseCard";
import Image from "next/image";
import DogImage from "@/public/images/application/dog.jpg";
import TypeImage from "@/public/images/application/repeat.jpg";
import LessonformImage from "@/public/images/application/check.jpg";
import DogListModal from "./DogListModal";

const Modal: React.FC<{onClose: () => void; children: React.ReactNode}> = ({
  onClose,
  children,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // 배경 클릭 시 닫기
    >
      <div
        className="bg-white rounded-xl p-6 w-80 relative"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 전파 막기
      >
        <button
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

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
  isSelected?: boolean;
  onSelect?: (checked: boolean) => void;
  onChangeDog: (wishlistItemId: number, dogId: number) => void;
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
  isSelected = false,
  onSelect,
  onChangeDog,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  console.log("🔥 WishlistCard props id:", wishlistItemId);

  return (
    <div className="relative cursor-pointer flex flex-col rounded-2xl shadow-md bg-white p-4 ">
      {/* 체크박스 */}
      <div
        className="absolute top-4 right-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          className="w-6 h-6 cursor-pointer"
          style={{accentColor: "var(--mt-blue-point)"}}
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect?.(e.target.checked);
          }}
        />
      </div>
      {/* CourseCard */}
      <CourseCard
        title={title}
        description={description}
        tags={tags ? tags.split(",") : []}
        location={location}
        sessionSchedule={schedule}
        mainImage={mainImage}
      />

      {/* 강아지 정보 + 수정 버튼 */}
      <div className="flex justify-between items-center mb-2 pl-1 pr-1">
        <div className="flex items-center text-xs font-medium text-gray-700 gap-1">
          <Image
            src={DogImage}
            placeholder="blur"
            alt="강아지"
            width={19}
            height={19}
          />
          <p className="text-sm text-gray-500">{dogName}</p>
        </div>
        {/* 타입 + 레슨폼 */}
        <div className="flex justify-end items-end gap-2 text-gray-700">
          <span className="flex gap-1 text-xs items-center leading-none px-1.5 py-0.5 rounded-full">
            <Image
              src={TypeImage}
              alt="타입"
              width={13}
              height={5}
              className="w-3.5 h-3.75"
            />
            {type}
          </span>
          <span className="flex gap-1 text-xs items-center leading-none px-1.5 py-0.5 rounded-full">
            <Image
              src={LessonformImage}
              alt="lessonform"
              width={13}
              height={5}
              className="w-3.5 h-3.75"
            />
            {lessonForm}
          </span>
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <div>
          <span className="text-sm text-gray-500">총 금액</span>
          <span className="text-xl font-bold text-[var(--mt-blue-point)]">
            {price.toLocaleString()}원
          </span>
        </div>
      </div>
      <button
        className="flex-1 flex items-center justify-center gap-2 py-2 text-sm mt-3 text-sm font-semibold rounded-lg text-[var(--mt-blue-point)]"
        style={{border: "1px solid #3b82f6"}}
        onClick={() => setIsModalOpen(true)}
      >
        반려견 변경
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-semibold mb-2">반려견 선택</h3>
          <DogListModal
            onSelect={(dogId) => {
              onChangeDog(wishlistItemId, dogId);
            }}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default WishlistCard;
