"use client";

import React from "react";

// =========================
// 재사용 가능한 모달 컴포넌트
// =========================
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

// =========================
// WishlistCard 컴포넌트
// =========================
import CourseCard from "@/components/shared/cards/CourseCard";
import Image from "next/image";
import DogImage from "@/public/images/application/dog.jpg";
import TypeImage from "@/public/images/application/repeat.jpg";
import LessonformImage from "@/public/images/application/check.jpg";

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
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col">
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
        <div className="flex justify-end items-end gap-2">
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
        className="flex-1 flex items-center justify-center gap-2 py-2 text-sm mt-3 text-sm font-semibold rounded-lg bg-blue-100 text-(--mt-blue-point)"
        onClick={() => setIsModalOpen(true)}
      >
        반려견 변경
      </button>

      {/* ==================== */}
      {/* 수정 모달 */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-semibold mb-2">수정하기</h3>
          {/* 여기서 수정 폼 넣으면 됨 */}
          <p>여기에 수정 폼을 넣으세요.</p>
        </Modal>
      )}
    </div>
  );
};

export default WishlistCard;
