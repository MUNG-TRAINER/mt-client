"use client";

import {loginAction} from "@/app/(beforeLogin)/login/actions";
import {EyeIcon, EyeSlashIcon} from "@/components/icons/eye";
import {LockClosedIcon} from "@/components/icons/lock";
import {UserIcon} from "@/components/icons/user";
import AuthInput from "@/components/shared/inputs/AuthInput";
import {useActionState, useState} from "react";
const initialState = {
  errMsg: undefined,
  resMsg: undefined,
};
export default function LoginForm() {
  const [togglePwd, setTogglePwd] = useState(false);
  const [state, action] = useActionState(loginAction, initialState);
  return (
    <form action={action} className="flex flex-col items-center w-full gap-3">
      <fieldset className="flex flex-col items-center gap-3 w-full">
        <legend>로그인</legend>
        <AuthInput
          id="userName"
          name="userName"
          labelTxt="아이디"
          type="text"
          placeholder="아이디를 입력하세요."
          headIcon={<UserIcon />}
          errMsg={state.errMsg?.properties?.userName.errors || []}
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
          errMsg={state.errMsg?.properties?.password.errors || []}
        />
      </fieldset>
      <button
        formAction={action}
        className="bg-(--mt-blue) text-(--mt-white) font-bold w-96 py-2 rounded-lg hover:bg-(--mt-blue-point) transition-colors ease-in-out duration-200 shadow-md"
      >
        로그인
      </button>
    </form>
  );
}
