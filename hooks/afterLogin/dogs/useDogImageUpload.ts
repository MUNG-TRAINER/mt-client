import { useState, useRef } from "react";
import { presignedUrlApi } from "@/apis/common/presignedUrl";
import { imageFileSchema } from "@/schemas/fileSchema";

export default function useDogImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 에러 초기화
    setFileError("");

    // Zod를 사용한 파일 검증
    const validation = imageFileSchema.safeParse(file);

    if (!validation.success) {
      const errorMessage =
        validation.error.issues[0]?.message || "파일 업로드에 실패했습니다.";
      setFileError(errorMessage);
      e.target.value = ""; // input 초기화
      return;
    }

    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const uploadImage = async (): Promise<string | undefined> => {
    if (!selectedFile) return undefined;

    setIsUploading(true);

    try {
      const presignedUrl = await presignedUrlApi.getPresignedUrl({
        category: "dog-profile",
        fileName: selectedFile.name,
        contentType: selectedFile.type,
      });

      const uploadedImageKey = await presignedUrlApi.uploadToS3(
        presignedUrl,
        selectedFile
      );

      setIsUploading(false);
      return uploadedImageKey;
    } catch (error) {
      setIsUploading(false);
      throw error;
    }
  };

  const cleanup = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const resetFileInput = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setFileError("");
  };

  return {
    selectedFile,
    previewUrl,
    fileError,
    isUploading,
    fileInputRef,
    handleFileSelect,
    uploadImage,
    cleanup,
    resetFileInput,
  };
}
