"use client";

import React from "react";
import CourseCard from "@/components/shared/cards/CourseCard";
import Image from "next/image";
import DogImage from "@/public/images/application/dog.jpg";
import TypeImage from "@/public/images/application/repeat.jpg";
import LessonformImage from "@/public/images/application/check.jpg";
import DogListModal from "./DogListModal";
import {useWishlistDogs} from "@/hooks/afterLogin/wishlist/useWishlistDogs";

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
  setModalContent?: (
    content: {title?: string; description: string} | null
  ) => void; //
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
  setModalContent,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const {dogs} = useWishlistDogs();
  const currentDog = dogs.find((dog) => dog.name === dogName);
  const [isCounselModalOpen, setIsCounselModalOpen] = React.useState(false);
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
        type={type}
        lessonForm={lessonForm}
        location={location}
        sessionSchedule={schedule}
        mainImage={mainImage}
      />

      {/* 강아지 정보 + 수정 버튼 */}
      <div className="flex justify-between items-center mb-2 pl-1 pr-1">
        <div className="flex justify-between w-full">
          <div className="flex items-center text-xs font-medium text-gray-700 gap-1">
            <Image
              src={DogImage}
              placeholder="blur"
              alt="강아지"
              width={19}
              height={19}
            />
            <p className="text-sm text-gray-500">{dogName}</p>
            {currentDog && !currentDog.hasCounseling && (
              <button
                className="text-xs text-orange-700 flex items-center rounded-lg px-3 py-1 ml-1 
                 border border-orange-700 hover:bg-orange-100 hover:border-orange-100"
                onClick={() => setIsCounselModalOpen(true)}
              >
                상담하기
              </button>
            )}
          </div>
          <div className="flex justify-end items-center pt-2 gap-2">
            <span className="text-sm text-gray-500">총 금액</span>
            <span className="text-xl font-bold text-[var(--mt-blue-point)]">
              {price.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* 상담 모달 */}
        {isCounselModalOpen && (
          <Modal onClose={() => setIsCounselModalOpen(false)}>
            <h3 className="text-lg font-semibold mb-2">상담 안내</h3>
            <p className="mb-4">
              상담이 안되어 있는 반려견입니다.
              <br /> 상담하러 가시겠습니까?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setIsCounselModalOpen(false)}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                  // 상담 페이지 API 호출 부분
                  setIsCounselModalOpen(false);
                }}
              >
                상담하기
              </button>
            </div>
          </Modal>
        )}
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
              if (dogId === currentDog?.dogId) {
                // 같은 강아지 선택 시 모달
                setModalContent?.({
                  title: "중복 선택",
                  description: "같은 반려견을 선택하셨어요.",
                });
                return;
              }
              onChangeDog(wishlistItemId, dogId);
              setIsModalOpen(false);
            }}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default WishlistCard;
