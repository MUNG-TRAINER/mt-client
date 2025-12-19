import { UserIcon } from "@/components/icons/user";
import Image from "next/image";
import { RefObject } from "react";

interface ProfileImageUploaderProps {
  profileImage: string | null;
  isImageDeleted: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onImageClick: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete: () => void;
  hasExistingImage: boolean;
}

export default function ProfileImageUploader({
  profileImage,
  isImageDeleted,
  fileInputRef,
  onImageClick,
  onImageChange,
  onImageDelete,
  hasExistingImage,
}: ProfileImageUploaderProps) {
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageChange}
        accept="image/*"
        className="hidden"
      />
      {profileImage && !isImageDeleted ? (
        <div className="relative size-30 rounded-full overflow-hidden bg-blue-300">
          <Image
            src={profileImage}
            fill
            alt="프로필 이미지"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center relative size-30 rounded-full overflow-hidden bg-blue-300">
          <UserIcon className="size-16 text-(--mt-blue-point)" />
        </div>
      )}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onImageClick}
          className="text-sm text-(--mt-gray) hover:text-(--mt-blue-point)"
        >
          {profileImage && !isImageDeleted ? "이미지 변경" : "이미지 선택"}
        </button>
        {(profileImage || hasExistingImage) && !isImageDeleted && (
          <button
            type="button"
            onClick={onImageDelete}
            className="text-sm text-red-500 hover:text-red-700"
          >
            이미지 삭제
          </button>
        )}
      </div>
    </>
  );
}
