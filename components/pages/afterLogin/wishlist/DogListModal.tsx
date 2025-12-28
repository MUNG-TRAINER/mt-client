"use client";
import Image from "next/image";
import React, {useState} from "react";
import {useWishlistDogs} from "@/hooks/afterLogin/wishlist/useWishlistDogs";
import DogImage from "@/public/images/application/dog.jpg";

interface DogListModalProps {
  onSelect?: (dogId: number) => void; // 최종 선택된 반려견 Id 전달
  onClose?: () => void; // 모달 닫기
  onChangeDog?: (wishlistItemId: number, dogId: number) => void;
  containerClassName?: string;
}

const DogListModal: React.FC<DogListModalProps> = ({onSelect, onClose}) => {
  const {dogs, loading, error} = useWishlistDogs();
  const [selectedDogId, setSelectedDogId] = useState<number | null>(null);
  const [modalContent, setModalContent] = useState<{
    title?: string;
    description: string;
  } | null>(null);

  if (loading) return <p>로딩 중...</p>;
  if (error)
    return <p className="text-red-500">반려견 목록을 불러올 수 없습니다.</p>;
  if (!dogs.length) return <p>등록된 반려견이 없습니다.</p>;

  const handleConfirm = () => {
    if (selectedDogId === null) {
      setModalContent({description: "반려견을 선택해주세요."});
      return;
    }
    onSelect?.(selectedDogId);
    onClose?.();
  };

  return (
    <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
      {dogs.map((dog) => (
        <label
          key={dog.dogId}
          className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${
            selectedDogId === dog.dogId
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300"
          }`}
        >
          <div className="flex flex-col">
            <div className="flex gap-2">
              <Image
                src={DogImage}
                placeholder="blur"
                alt="강아지"
                width={19}
                height={19}
                className="w-6"
              />
              <span className="font-medium text-gray-800 ">{dog.name}</span>
              {!dog.hasCounseling && (
                <span className="text-xs text-orange-700 flex items-center">
                  상담 필요
                </span>
              )}
            </div>
          </div>
          <input
            type="radio"
            name="dog"
            className="w-5 h-5 accent-blue-500"
            checked={selectedDogId === dog.dogId}
            onChange={() => setSelectedDogId(dog.dogId)}
          />
        </label>
      ))}

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-semibold"
        onClick={handleConfirm}
      >
        수정하기
      </button>
    </div>
  );
};

export default DogListModal;
