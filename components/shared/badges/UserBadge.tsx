import {UserRoleType} from "@/types/mypage/myPageType";

export default function UserBadge({role}: {role: UserRoleType}) {
  const generateClass = (role: UserRoleType) => {
    return role === "TRAINER"
      ? "bg-blue-500"
      : role === "ADMIN"
      ? "bg-teal-500"
      : "bg-amber-500";
  };
  const generateTxt = (role: UserRoleType) => {
    return role === "TRAINER" ? "훈련사" : role === "ADMIN" ? "관리자" : "유저";
  };

  return (
    <span
      className={`px-2 py-1 rounded-2xl text-sm font-semibold text-(--mt-white) ${generateClass(
        role
      )}`}
    >
      {generateTxt(role)}
    </span>
  );
}
