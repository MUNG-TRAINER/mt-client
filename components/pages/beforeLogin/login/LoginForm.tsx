"use client";

import {fcmApi} from "@/apis/fcm/fcmApi";
import {loginAction} from "@/app/(beforeLogin)/login/actions";
import {EyeIcon, EyeSlashIcon} from "@/components/icons/eye";
import {LockClosedIcon} from "@/components/icons/lock";
import {UserIcon} from "@/components/icons/user";
import {useFCM} from "@/components/providers/firebaseProvider/FirebaseProvider";
import AuthInput from "@/components/shared/inputs/AuthInput";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import {loginSchema} from "@/schemas/loginSchema";
import {IFormResultType} from "@/types/formResultType";
import {customQueryClient} from "@/util/queryClient";
import {useActionState, useState} from "react";

const initState = {
  errMsg: undefined,
  resMsg: undefined,
};
export default function LoginForm() {
  const [togglePwd, setTogglePwd] = useState(false);
  const [clearErrors, setClearErrors] = useState<Set<"userName" | "password">>(
    new Set(),
  );

  const {refreshUserCheck} = useCheckLoggedIn();
  const {token} = useFCM();
  const [state, action, isPending] = useActionState(
    async (state: IFormResultType<typeof loginSchema>, formData: FormData) => {
      setClearErrors(new Set());
      const result = await loginAction(state, formData);
      if (!result.errMsg && !result.resMsg) {
        await fcmApi.updateFcmToken(token ?? "");
        customQueryClient.setQueryData(["auth"], {loggedOut: false});
        refreshUserCheck();
        window.location.href = "/";
      }
      return result;
    },
    initState,
  );

  /* fn */
  // 에러메세지 초기화
  const handleFieldChange = (field: "userName" | "password") => {
    if (!state.errMsg?.properties?.[field]) return;
    setClearErrors((prev) => {
      const prevSet = new Set(prev);
      prevSet.add(field);
      return prevSet;
    });
  };
  /* variables */
  const userNameErrors = clearErrors.has("userName")
    ? []
    : state.errMsg?.properties?.userName?.errors || [];
  const passwordErrors = clearErrors.has("password")
    ? []
    : state.errMsg?.properties?.password?.errors || [];
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
          errMsg={userNameErrors}
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
          errMsg={passwordErrors}
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
      {state.resMsg && (
        <p className="text-xs text-(--mt-red)">{state.resMsg}</p>
      )}
    </form>
  );
}
