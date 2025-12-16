"use client";

import { ITrainerInfoType } from "@/types/trainer/trainerType";
import { UserIcon } from "@/components/icons/user";
import { EnvelopeIcon } from "@/components/icons/envelope";
import { PhoneIcon } from "@/components/icons/phone";
import { CheckBadgeIcon } from "@/components/icons/badges";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { trainerApi } from "@/apis/trainer/trainerApi";
import { set } from "zod";
import { profile } from "console";

interface ITrainerEditFormProps {
  trainer: ITrainerInfoType;
  trainerId: string;
}

export default function TrainerEditForm({
  trainer,
  trainerId,
}: ITrainerEditFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: trainer.name || "",
    email: trainer.email || "",
    phone: trainer.phone || "",
    careerInfo: trainer.careerInfo || "",
    introduce: trainer.introduce || trainer.description || "",
    style: trainer.style || "",
    tag: trainer.tag || "",
  });

  const [submitting, setSubmitting] = useState(false);

  // 미리보기용
  const [profilePreview, setProfilePreview] = useState<string | null>(
    trainer.profileImage || null
  );
  const [certPreview, setCertPreview] = useState<string | null>(
    trainer.certificationImageUrl || null
  );

  // 실제 선택된 파일
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);

  const pickValue = (current: string, initial: string) => {
    const trimmed = current?.trim?.();
    return trimmed ? trimmed : initial ?? "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cert"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    if (type === "profile") {
      setProfilePreview(previewUrl);
      setProfileFile(file);
    } else {
      setCertPreview(previewUrl);
      setCertFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);

      let nextProfileImageKey = trainer.profileImage ?? null;
      let nextCertImageKey = trainer.certificationImageUrl ?? null;

      /** 1. 프로필 이미지 업로드 */
      if (profileFile) {
        const { uploadUrl, fileKey } = await trainerApi.getPresignedUrl(
          "user-profile",
          profileFile.name,
          profileFile.type
        );
        await trainerApi.fileUpload(uploadUrl, profileFile);
        nextProfileImageKey = fileKey;
      }
      /** 2. 자격증 이미지 업로드 */
      if (certFile) {
        const { uploadUrl, fileKey } = await trainerApi.getPresignedUrl(
          "trainer-certification",
          certFile.name,
          certFile.type
        );

        await trainerApi.fileUpload(uploadUrl, certFile);
        nextCertImageKey = fileKey;
      }

      /** 3. JSON Payload 구성 */
      const payload: ITrainerInfoType = {
        trainerId: trainer.trainerId, // 서버에서 안 쓰면 제거 가능
        name: pickValue(formData.name, trainer.name),
        email: pickValue(formData.email, trainer.email),
        phone: pickValue(formData.phone, trainer.phone),
        careerInfo: pickValue(formData.careerInfo, trainer.careerInfo),
        introduce: pickValue(formData.introduce, trainer.introduce),
        description: trainer.description, // 수정 안 하면 유지
        style: pickValue(formData.style, trainer.style),
        tag: pickValue(formData.tag, trainer.tag),
        profileImage: nextProfileImageKey,
        certificationImageUrl: nextCertImageKey,
      };

      await trainerApi.uploadProfile(payload);
      router.push(`/trainer/${trainerId}`);
    } catch (err) {
      console.error(err);
      alert("저장에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/trainer/${trainerId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 프로필 이미지 */}
      <div className="bg-white rounded-lg border border-(--mt-gray-light) p-6">
        <h3 className="font-bold text-(--mt-black) mb-4">프로필 이미지</h3>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {profilePreview ? (
              <div className="relative size-32 rounded-full overflow-hidden bg-(--mt-blue-light) border-4 border-(--mt-blue-point)">
                <Image
                  src={profilePreview}
                  alt="프로필 이미지"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center relative size-32 rounded-full overflow-hidden bg-(--mt-blue-light) border-4 border-(--mt-blue-point)">
                <UserIcon className="size-16 text-(--mt-blue-point)" />
              </div>
            )}
          </div>
          <label className="cursor-pointer px-4 py-2 bg-(--mt-blue-point) text-white rounded-lg font-medium hover:bg-(--mt-blue) transition-colors">
            이미지 업로드
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, "profile")}
            />
          </label>
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="bg-white rounded-lg border border-(--mt-gray-light) p-6 space-y-4">
        <h3 className="font-bold text-(--mt-black) mb-4">기본 정보</h3>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-(--mt-gray)">
            <UserIcon className="size-4" />
            이름
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-(--mt-gray-light) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--mt-blue-point)"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-(--mt-gray)">
            <EnvelopeIcon className="size-4" />
            이메일
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-(--mt-gray-light) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--mt-blue-point)"
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-(--mt-gray)">
            <PhoneIcon className="size-4" />
            연락처
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-(--mt-gray-light) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--mt-blue-point)"
            placeholder="연락처를 입력하세요"
          />
        </div>
      </div>

      {/* 경력 사항 */}
      <div className="bg-white rounded-lg border border-(--mt-gray-light) p-6 space-y-4">
        <h3 className="font-bold text-(--mt-black) mb-4">경력 사항</h3>
        <textarea
          name="careerInfo"
          value={formData.careerInfo}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 border border-(--mt-gray-light) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--mt-blue-point) resize-none"
          placeholder="경력 사항을 '-'로 구분하여 입력하세요&#10;예시: 반려견 훈련사 자격증 보유-10년 경력의 전문 훈련사"
        />
        <p className="text-xs text-(--mt-gray)">
          * 각 경력은 &apos;-&apos;로 구분해주세요
        </p>
      </div>

      {/* 자기소개 */}
      <div className="bg-white rounded-lg border border-(--mt-gray-light) p-6 space-y-4">
        <h3 className="font-bold text-(--mt-black) mb-4">자기소개</h3>
        <textarea
          name="introduce"
          value={formData.introduce}
          onChange={handleChange}
          rows={6}
          className="w-full p-3 border border-(--mt-gray-light) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--mt-blue-point) resize-none"
          placeholder="자기소개를 입력하세요"
        />
      </div>

      {/* 훈련 스타일 */}
      <div className="bg-white rounded-lg border border-(--mt-gray-light) p-6 space-y-4">
        <h3 className="font-bold text-(--mt-black) mb-4">훈련 스타일</h3>

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--mt-gray)">스타일</label>
          <input
            type="text"
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="w-full p-3 border border-(--mt-gray-light) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--mt-blue-point)"
            placeholder="훈련 스타일을 입력하세요"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--mt-gray)">태그</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="w-full p-3 border border-(--mt-gray-light) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--mt-blue-point)"
            placeholder="태그를 입력하세요"
          />
        </div>
      </div>

      {/* 보유 자격증 */}
      <div className="bg-white rounded-lg border border-(--mt-gray-light) p-6 space-y-4">
        <h3 className="font-bold text-(--mt-black) mb-4">보유 자격증</h3>

        {certPreview ? (
          <div className="space-y-3">
            <div className="relative w-full rounded-lg overflow-hidden border border-(--mt-gray-light)">
              <Image
                src={certPreview}
                alt="자격증"
                width={600}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
            <label className="cursor-pointer w-full block text-center px-4 py-2 bg-(--mt-green-point) text-white rounded-lg font-medium hover:bg-(--mt-green) transition-colors">
              이미지 변경
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "cert")}
              />
            </label>
          </div>
        ) : (
          <label className="cursor-pointer w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-(--mt-gray-light) rounded-lg hover:bg-(--mt-gray-smoke) transition-colors">
            <CheckBadgeIcon className="size-12 text-(--mt-gray-point) mb-2" />
            <span className="text-sm text-(--mt-gray)">
              자격증 이미지를 업로드하세요
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, "cert")}
            />
          </label>
        )}
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 py-3 border border-(--mt-gray-light) text-(--mt-gray) rounded-lg font-bold hover:bg-(--mt-gray-smoke) transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 py-3 bg-(--mt-blue-point) text-white rounded-lg font-bold hover:bg-(--mt-blue) transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}
