"use client";
import { LockClosedIcon } from "@/components/icons/lock";
import useChangePassword from "@/hooks/afterLogin/users/useChangePassword";
import { changePasswordSchema } from "@/schemas/passwordSchema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@/components/icons/eye";

export default function ChangePassword() {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useChangePassword();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    if (isError) {
      console.error("비밀번호 변경 실패:", error);
    }
  }, [isError, error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    const result = changePasswordSchema.safeParse(formData);

    if (!result.success) {
      const errors: typeof validationErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof validationErrors;
        if (field) {
          errors[field] = issue.message;
        }
      });
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    mutate(result.data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-4 overflow-y-auto"
    >
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-bold text-(--mt-black)">비밀번호 변경</h1>
        <p className="text-sm text-(--mt-gray)">
          안전한 비밀번호로 내 정보를 보호하세요.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label className="font-bold">기존 비밀번호</label>
          <div className="relative flex items-center">
            <div className="absolute left-3 flex items-center pointer-events-none">
              <LockClosedIcon className="size-5 text-(--mt-gray)" />
            </div>
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="기존 비밀번호를 입력하세요"
              className={`border ${
                validationErrors.oldPassword
                  ? "border-red-500"
                  : "border-(--mt-gray-light)"
              } pl-10 pr-10 py-2 w-full rounded-xl focus:outline-none focus:border-(--mt-blue-point)`}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 flex items-center"
              aria-label={
                showOldPassword ? "기존 비밀번호 숨기기" : "기존 비밀번호 보기"
              }
            >
              {showOldPassword ? (
                <EyeSlashIcon className="size-5 text-(--mt-gray)" />
              ) : (
                <EyeIcon className="size-5 text-(--mt-gray)" />
              )}
            </button>
          </div>
          {validationErrors.oldPassword && (
            <p className="text-sm text-red-500">
              {validationErrors.oldPassword}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold">새 비밀번호</label>
          <div className="relative flex items-center">
            <div className="absolute left-3 flex items-center pointer-events-none">
              <LockClosedIcon className="size-5 text-(--mt-gray)" />
            </div>
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호를 입력하세요"
              className={`border ${
                validationErrors.newPassword
                  ? "border-red-500"
                  : "border-(--mt-gray-light)"
              } pl-10 pr-10 py-2 w-full rounded-xl focus:outline-none focus:border-(--mt-blue-point)`}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 flex items-center"
              aria-label={
                showNewPassword ? "새 비밀번호 숨기기" : "새 비밀번호 보기"
              }
            >
              {showNewPassword ? (
                <EyeSlashIcon className="size-5 text-(--mt-gray)" />
              ) : (
                <EyeIcon className="size-5 text-(--mt-gray)" />
              )}
            </button>
          </div>
          {validationErrors.newPassword && (
            <p className="text-sm text-red-500">
              {validationErrors.newPassword}
            </p>
          )}
          <p className="text-xs text-(--mt-gray)">8자 이상</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold">새 비밀번호 확인</label>
          <div className="relative flex items-center">
            <div className="absolute left-3 flex items-center pointer-events-none">
              <LockClosedIcon className="size-5 text-(--mt-gray)" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="새 비밀번호를 다시 입력하세요"
              className={`border ${
                validationErrors.confirmPassword
                  ? "border-red-500"
                  : "border-(--mt-gray-light)"
              } pl-10 pr-10 py-2 w-full rounded-xl focus:outline-none focus:border-(--mt-blue-point)`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 flex items-center"
              aria-label={
                showConfirmPassword
                  ? "비밀번호 확인 숨기기"
                  : "비밀번호 확인 보기"
              }
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="size-5 text-(--mt-gray)" />
              ) : (
                <EyeIcon className="size-5 text-(--mt-gray)" />
              )}
            </button>
          </div>
          {validationErrors.confirmPassword && (
            <p className="text-sm text-red-500">
              {validationErrors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 border border-(--mt-gray) text-(--mt-gray) py-3 rounded-md font-bold hover:bg-(--mt-gray-light) transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isPending}
          className={`flex-1 py-3 rounded-md font-bold text-(--mt-white) transition-colors ${
            isPending
              ? "bg-(--mt-gray) cursor-not-allowed"
              : "bg-(--mt-blue-point) hover:bg-(--mt-blue)"
          }`}
        >
          {isPending ? "변경 중..." : "변경하기"}
        </button>
      </div>
      {isError && (
        <p className="text-sm text-(--mt-red) text-center mt-2">
          비밀번호 변경에 실패했습니다. 기존 비밀번호를 확인해주세요.
        </p>
      )}
    </form>
  );
}
