"use client";
import { UserIcon } from "@/components/icons/user";
import UserBadge from "@/components/shared/badges/UserBadge";
import ToggleSlide from "@/components/shared/toggleSlide/ToggleSlide";
import useMe from "@/hooks/afterLogin/users/useMe";
import useUpdatePublicStatus from "@/hooks/afterLogin/users/useUpdatePublicStatus";
import Image from "next/image";
import Link from "next/link";
import { CakeIcon } from "@/components/icons/cake";
import { PhoneIcon } from "@/components/icons/phone";
import { EnvelopeIcon } from "@/components/icons/envelope";
import { MapPinIcon, MapIcon } from "@/components/icons/location";
import { BuildingOffice2Icon, HomeIcon } from "@/components/icons/home";
import AuthInput from "@/components/shared/inputs/AuthInput";

export default function MyPage() {
  const { data, isPending } = useMe();
  const { mutate: updatePublicStatus } = useUpdatePublicStatus();

  const handleToggleChange = () => {
    if (data?.isPublic !== undefined) {
      updatePublicStatus(!data.isPublic);
    }
  };

  if (isPending) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-3 overflow-y-auto">
      <div className="flex flex-col items-center gap-2">
        {data?.profileImage ? (
          <div className="relative size-30 rounded-full overflow-hidden bg-blue-300">
            <Image
              src={data?.profileImage}
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
        <div className="flex items-center gap-2">
          <UserBadge role={data?.role} />
          <h2 className="font-bold">{data?.userName}</h2>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <AuthInput
          id="name"
          name="name"
          type="text"
          labelTxt="이름"
          placeholder="이름"
          headIcon={<UserIcon className="size-5" />}
          value={data?.name || ""}
          readOnly
        />

        <div className="flex flex-col gap-2">
          <label className="font-bold">이메일</label>
          <div className="relative flex items-center">
            <div className="absolute left-3 flex items-center pointer-events-none">
              <EnvelopeIcon />
            </div>
            <input
              type="text"
              value={data?.email || ""}
              readOnly
              className="border border-(--mt-gray-light) pl-10 pr-3 py-2 w-full rounded-xl bg-(--mt-gray-light) cursor-not-allowed"
            />
          </div>
        </div>

        <AuthInput
          id="phone"
          name="phone"
          type="tel"
          labelTxt="연락처"
          placeholder="연락처"
          headIcon={<PhoneIcon />}
          value={data?.phone || ""}
          readOnly
        />

        <AuthInput
          id="birth"
          name="birth"
          type="date"
          labelTxt="생년월일"
          placeholder="생년월일"
          headIcon={<CakeIcon />}
          value={data?.birth || ""}
          readOnly
        />

        {data?.role === "TRAINER" && (
          <Link
            href={`/trainer/${data.userId}`}
            className="py-2 text-center bg-(--mt-blue-point) p-2 rounded-xl text-(--mt-white) text-nowrap font-bold shadow-md"
          >
            훈련사 상세페이지
          </Link>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-bold">나의 반려견</label>
          <div className="border border-(--mt-gray-light) p-3 rounded-xl flex flex-col gap-3">
            <Link
              href={"/mydogs"}
              className="py-2 text-center bg-(--mt-blue-point) rounded-xl text-(--mt-white) text-nowrap font-bold shadow-md"
            >
              나의 반려견 정보 보러가기
            </Link>
            <div className="flex justify-between items-center">
              <span className="font-bold text-(--mt-black) text-nowrap">
                반려견 프로필 공개
              </span>
              <ToggleSlide
                toggleState={data?.isPublic ?? false}
                toggleFn={handleToggleChange}
                barWidth={60}
                barHeight={30}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold flex items-center gap-2">
            <MapPinIcon className="size-5" />
            주소
          </label>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-(--mt-gray)">시/도</label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <MapPinIcon className="size-5 text-(--mt-gray)" />
                </div>
                <input
                  type="text"
                  value={data?.sido || ""}
                  readOnly
                  placeholder="주소를 입력해주세요"
                  className="border border-(--mt-gray-light) pl-10 pr-3 py-2 w-full rounded-xl bg-(--mt-gray-light) cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-(--mt-gray)">시/군/구</label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <MapIcon className="size-5 text-(--mt-gray)" />
                </div>
                <input
                  type="text"
                  value={data?.sigungu || ""}
                  readOnly
                  placeholder="주소를 입력해주세요"
                  className="border border-(--mt-gray-light) pl-10 pr-3 py-2 w-full rounded-xl bg-(--mt-gray-light) cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-(--mt-gray)">도로명주소</label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <HomeIcon className="size-5 text-(--mt-gray)" />
                </div>
                <input
                  type="text"
                  value={data?.roadname || ""}
                  readOnly
                  placeholder="주소를 입력해주세요"
                  className="border border-(--mt-gray-light) pl-10 pr-3 py-2 w-full rounded-xl bg-(--mt-gray-light) cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-(--mt-gray)">우편번호</label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="size-5 text-(--mt-gray)" />
                </div>
                <input
                  type="text"
                  value={data?.postcode || ""}
                  readOnly
                  placeholder="주소를 입력해주세요"
                  className="border border-(--mt-gray-light) pl-10 pr-3 py-2 w-full rounded-xl bg-(--mt-gray-light) cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-(--mt-gray)">상세주소</label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <BuildingOffice2Icon className="size-5 text-(--mt-gray)" />
                </div>
                <input
                  type="text"
                  value={data?.restAddress || ""}
                  readOnly
                  placeholder="주소를 입력해주세요"
                  className="border border-(--mt-gray-light) pl-10 pr-3 py-2 w-full rounded-xl bg-(--mt-gray-light) cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          href="/mypage/edit"
          className="flex-1 bg-(--mt-blue-point) text-(--mt-white) py-3 rounded-md font-bold text-center hover:bg-(--mt-blue) transition-colors"
        >
          수정
        </Link>
        <Link
          href="/mypage/password"
          className="flex-1 border border-(--mt-gray) text-(--mt-gray) py-3 rounded-md font-bold text-center hover:bg-(--mt-gray-light) transition-colors"
        >
          비밀번호변경
        </Link>
      </div>
    </div>
  );
}
