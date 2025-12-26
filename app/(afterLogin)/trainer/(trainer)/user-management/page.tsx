"use client";

import {useState} from "react";
import {ITrainerUserListResponse} from "@/types/trainer/trainerUserType";
import {UserIcon} from "@/components/icons/user";
import {ChevronRightIcon} from "@/components/icons/chevron";
import {PhoneIcon} from "@/components/icons/phone";
import {EnvelopeIcon} from "@/components/icons/envelope";
import DogListModal from "@/components/pages/afterLogin/trainer/userManagement/DogListModal";
import Image from "next/image";
import useManageUsers from "@/hooks/afterLogin/trainer/useManageUsers";

export default function UserManagementPage() {
  const [selectedUser, setSelectedUser] =
    useState<ITrainerUserListResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {users, isLoading, error} = useManageUsers();

  const handleUserClick = (user: ITrainerUserListResponse) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (isLoading) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p className="text-(--mt-gray)">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p className="text-red-500">오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-4 overflow-y-auto">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-(--mt-black)">회원관리</h1>
        <span className="text-sm text-(--mt-blue-point) font-medium">
          총 {users.length}명
        </span>
      </div>

      {/* 회원 목록 */}
      {users.length > 0 ? (
        <div className="flex flex-col gap-3">
          {users.map((user) => (
            <button
              key={user.userId}
              onClick={() => handleUserClick(user)}
              className="p-4 bg-gray-100 rounded-2xl flex items-center gap-3 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {/* 프로필 이미지 */}
              <div className="overflow-hidden size-16 rounded-full relative shrink-0">
                {user.profileImage && user.profileImage.trim() ? (
                  <Image
                    src={user.profileImage}
                    alt={user.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="bg-gray-300 flex items-center justify-center size-16 rounded-full">
                    <UserIcon className="size-9 text-white" />
                  </div>
                )}
              </div>

              {/* 회원 정보 */}
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-(--mt-black)">
                  {user.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <PhoneIcon className="size-4 text-gray-400" />
                  <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <EnvelopeIcon className="size-4 text-gray-400" />
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* 화살표 */}
              <ChevronRightIcon className="size-5 text-gray-400 shrink-0" />
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-(--mt-gray) text-lg">등록된 회원이 없습니다.</p>
        </div>
      )}

      {/* 반려견 리스트 모달 */}
      {isModalOpen && selectedUser && (
        <DogListModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
}
