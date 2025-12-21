"use client";

import {EyeIcon, EyeSlashIcon} from "@/components/icons/eye";
import {LockClosedIcon} from "@/components/icons/lock";
import {UserIcon} from "@/components/icons/user";
import AuthInput from "@/components/shared/inputs/AuthInput";
import useLogin from "@/hooks/beforeLogin/login/useLogin";
import {loginSchema} from "@/schemas/loginSchema";
import {ZodErrorTree} from "@/types/formResultType";
import {FormEvent, useState} from "react";
import {treeifyError} from "zod";

export default function LoginForm() {
  const [togglePwd, setTogglePwd] = useState(false);
  const [fieldErrors, setFieldErrors] =
    useState<ZodErrorTree<typeof loginSchema>>();
  /* Custom Hook */
  const {mutate, isPending, isError, reset} = useLogin();
  /* fn */
  // 로그인
  const handleFormAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      userName: formData.get("userName"),
      password: formData.get("password"),
    };
    const result = await loginSchema.safeParseAsync(data);
    if (!result.success) {
      setFieldErrors(treeifyError(result.error));
      return;
    }
    mutate(result.data);
  };
  // 에러메세지 초기화
  const handleFieldChange = (field: "userName" | "password") => {
    setFieldErrors((prev) => {
      if (!prev?.properties) return prev;
      const next = structuredClone(prev);
      if (!next.properties) return;
      delete next.properties[field];
      return next;
    });
    reset();
  };

  return (
    <form
      onSubmit={handleFormAction}
      className="flex flex-col items-center w-full gap-3"
    >
      <fieldset className="flex flex-col items-center gap-3 w-full">
        <legend>로그인</legend>
        <AuthInput
          id="userName"
          name="userName"
          labelTxt="아이디"
          type="text"
          placeholder="아이디를 입력하세요."
          headIcon={<UserIcon />}
          errMsg={
            (fieldErrors?.properties &&
              fieldErrors.properties.userName?.errors) ||
            []
          }
          onChange={() => handleFieldChange("userName")}
          required
        />
        <AuthInput
          id="password"
          name="password"
          labelTxt="비밀번호"
          type={togglePwd ? "text" : "password"}
          placeholder="비밀번호를 입력하세요."
          headIcon={<LockClosedIcon />}
          tailIcon={<EyeIcon />}
          stateTrueTailIcon={<EyeSlashIcon />}
          fnState={togglePwd}
          fn={() => setTogglePwd((prev) => !prev)}
          errMsg={
            (fieldErrors?.properties &&
              fieldErrors.properties.password?.errors) ||
            []
          }
          onChange={() => handleFieldChange("password")}
          required
        />
      </fieldset>
      <button
        className={`${
          isPending ? "bg-(--mt-gray)" : "bg-(--mt-blue)"
        } text-(--mt-white) font-bold w-full py-2 rounded-lg hover:bg-(--mt-blue-point) transition-colors ease-in-out duration-200 shadow-md`}
      >
        {isPending ? "로그인 중..." : "로그인"}
      </button>
      {isError && (
        <p className="text-xs text-(--mt-red)">로그인에 실패하였습니다.</p>
      )}
    </form>
  );
}
