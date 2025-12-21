import Image from "next/image";
import { memo } from "react";
import { DogIcon } from "@/components/icons/dog";
import ErrorMessage from "@/components/shared/feedback/ErrorMessage";

interface DogImageUploaderProps {
  previewUrl: string;
  existingImageUrl?: string | null;
  dogId?: number;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  fileError: string;
  isDisabled: boolean;
  isDeleted?: boolean;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
  onImageDelete?: () => void;
}

const DogImageUploader = memo(function DogImageUploader({
  previewUrl,
  existingImageUrl,
  dogId,
  fileInputRef,
  fileError,
  isDisabled,
  isDeleted,
  onFileSelect,
  onButtonClick,
  onImageDelete,
}: DogImageUploaderProps) {
  const getPlaceholderColor = () => {
    if (dogId !== undefined) {
      return `hsl(${(dogId * 137.5) % 360}, 70%, 80%)`;
    }
    return "hsl(200, 70%, 80%)";
  };

  const hasImage = previewUrl || (existingImageUrl && !isDeleted);

  return (
    <div className="flex flex-col items-center gap-2">
      {previewUrl ? (
        <div className="relative size-30 rounded-full overflow-hidden bg-blue-300">
          <Image
            src={previewUrl}
            alt="반려견 프로필 미리보기"
            fill
            sizes="120px"
            className="object-cover"
            unoptimized
          />
        </div>
      ) : existingImageUrl && !isDeleted ? (
        <div className="relative size-30 rounded-full overflow-hidden bg-blue-300">
          <Image
            src={existingImageUrl}
            alt="반려견 프로필"
            fill
            sizes="120px"
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div
          className="flex items-center justify-center relative size-30 rounded-full overflow-hidden"
          style={{
            backgroundColor: getPlaceholderColor(),
          }}
        >
          <DogIcon className="size-16 text-white" />
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        className="hidden"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onButtonClick}
          disabled={isDisabled}
          className="text-sm text-(--mt-gray) disabled:opacity-50 disabled:cursor-not-allowed hover:text-(--mt-blue-point)"
          aria-label={previewUrl ? "이미지 변경" : "이미지 선택"}
        >
          {previewUrl ? "이미지 변경" : "이미지 선택"}
        </button>
        {hasImage && onImageDelete && (
          <button
            type="button"
            onClick={onImageDelete}
            disabled={isDisabled}
            className="text-sm text-red-500 disabled:opacity-50 disabled:cursor-not-allowed hover:text-red-700"
            aria-label="이미지 삭제"
          >
            이미지 삭제
          </button>
        )}
      </div>

      <ErrorMessage message={fileError} className="w-full text-center" />
    </div>
  );
});

export default DogImageUploader;
