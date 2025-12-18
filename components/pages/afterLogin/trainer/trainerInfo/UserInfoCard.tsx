"use client";
import { UserIcon } from "@/components/icons/user";
import { EnvelopeIcon } from "@/components/icons/envelope";
import { PhoneIcon } from "@/components/icons/phone";
import useMe from "@/hooks/afterLogin/users/useMe";
import Image from "next/image";
import Link from "next/link";
import { ITrainerInfoType } from "@/types/trainer/trainerType";
import useCheckLoggedIn from "./../../../../../hooks/afterLogin/users/useCheckLoggedIn";

export default function UserInfoCard({ user }: { user: ITrainerInfoType }) {
  const { checkIsOwner } = useCheckLoggedIn();
  const isOwner = checkIsOwner(user.trainerId);
  return (
    <div className="bg-white rounded-lg border border-(--mt-gray-light) p-6 space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center">
          {user?.profileImage ? (
            <div className="relative size-32 rounded-full overflow-hidden bg-(--mt-blue-light) border-4 border-(--mt-blue-point)">
              <Image
                src={user?.profileImage}
                alt="프로필 이미지"
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center relative size-32 rounded-full overflow-hidden bg-(--mt-blue-light) border-4 border-(--mt-blue-point)">
              <UserIcon className="size-16 text-(--mt-blue-point)" />
            </div>
          )}
        </div>
        {isOwner && (
          <Link
            href={`/trainer/${user.trainerId}/edit`}
            className="text-sm text-(--mt-blue-point) font-medium hover:underline"
          >
            프로필 수정
          </Link>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-(--mt-blue-smoke) rounded-lg">
          <UserIcon className="size-5 text-(--mt-blue-point)" />
          <div className="flex flex-col">
            <span className="text-xs text-(--mt-gray)">이름</span>
            <span className="font-bold text-(--mt-black)">{user.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-(--mt-blue-smoke) rounded-lg">
          <EnvelopeIcon className="size-5 text-(--mt-red-point)" />
          <div className="flex flex-col">
            <span className="text-xs text-(--mt-gray)">이메일</span>
            <span className="text-sm text-(--mt-black)">{user.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-(--mt-blue-smoke) rounded-lg">
          <PhoneIcon className="size-5 text-(--mt-green-point)" />
          <div className="flex flex-col">
            <span className="text-xs text-(--mt-gray)">연락처</span>
            <span className="text-sm text-(--mt-black)">{user.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
