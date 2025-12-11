"use client";

import {EnvelopeIcon} from "@/components/icons/envelope";
import {EyeIcon, EyeSlashIcon} from "@/components/icons/eye";
import {LockClosedIcon} from "@/components/icons/lock";
import {UserIcon} from "@/components/icons/user";
import AuthInput from "@/components/shared/inputs/AuthInput";
import useCheckEmail from "@/hooks/beforeLogin/join/useCheckEmail";
import useCheckUserName from "@/hooks/beforeLogin/join/useCheckUserName";
import {useActionState, useEffect, useState} from "react";
import JoinAddress from "./JoinAddress";
import {joinAction} from "@/app/(beforeLogin)/join/actions";
import {CalendarIcon} from "@/components/icons/calendar";

const initailState = {
  errMsg: undefined,
  resMsg: undefined,
};

export default function JoinForm() {
  const [togglePwd, setTogglePwd] = useState(false);
  const [toogleCheckPwd, setToggleCheckPwd] = useState(false);
  const [checkEmail, setCheckEmail] = useState("");
  const [checkUserName, setCheckUserName] = useState("");
  const [ableStatus, setAbleStatus] = useState({pwd: true, email: true});
  // form action
  const [state, action, isPending] = useActionState(joinAction, initailState);
  // Custom Hook
  const {refetch: checkUserNameRefetch} = useCheckUserName(checkUserName);
  const {refetch: checkEmailRefetch} = useCheckEmail(checkEmail);
  //fn
  const handleCheckUserName = () => {
    if (!checkUserName.trim()) {
      setAbleStatus({pwd: false, email: false});
      return;
    }
    checkUserNameRefetch();
    setAbleStatus({pwd: false, email: false});
  };
  const handleCheckEmail = () => {
    if (!checkEmail.trim()) {
    }
    checkEmailRefetch();
    setAbleStatus({pwd: false, email: false});
  };
  useEffect(() => {
    const kakaoScript = document.createElement("script");
    kakaoScript.setAttribute(
      "src",
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
    );
    document.body.appendChild(kakaoScript);
    return () => {
      document.body.removeChild(kakaoScript);
    };
  }, []);
  return (
    <form
      action={action}
      className="flex flex-col gap-5 w-full overflow-y-auto p-2"
    >
      <fieldset className="flex flex-col gap-2">
        <legend>회원가입</legend>
        <div className="flex  items-center gap-2">
          <AuthInput
            id="userName"
            name="userName"
            type="text"
            labelTxt="아이디"
            placeholder="아이디를 입력하세요."
            headIcon={<UserIcon />}
            onChange={(e) => setCheckUserName(e.target.value)}
            errMsg={
              (state.errMsg?.properties &&
                state.errMsg.properties.userName?.errors) ??
              []
            }
          />
          <button
            type="button"
            onClick={handleCheckUserName}
            className="text-sm text-nowrap bg-(--mt-blue-point) text-(--mt-white) px-2 py-1 rounded-md mt-6"
          >
            아이디 중복확인
          </button>
        </div>
        <div className="flex  items-center gap-2">
          <AuthInput
            id="email"
            name="email"
            type="email"
            labelTxt="이메일"
            placeholder="이메일을 입력하세요."
            headIcon={<EnvelopeIcon />}
            onChange={(e) => setCheckEmail(e.target.value)}
            errMsg={
              (state.errMsg?.properties &&
                state.errMsg.properties.email?.errors) ??
              []
            }
          />
          <button
            type="button"
            onClick={handleCheckEmail}
            className="text-sm text-nowrap bg-(--mt-blue-point) text-(--mt-white) px-2 py-1 rounded-md mt-6"
          >
            이메일 중복확인
          </button>
        </div>
        <AuthInput
          id="phone"
          name="phone"
          type="phone"
          labelTxt="전화번호"
          placeholder="전화번호를 입력하세요."
          headIcon={<UserIcon />}
          errMsg={
            (state.errMsg?.properties &&
              state.errMsg.properties.phone?.errors) ??
            []
          }
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
            (state.errMsg?.properties &&
              state.errMsg.properties.password?.errors) ??
            []
          }
        />
        <AuthInput
          id="passwordCheck"
          name="passwordCheck"
          labelTxt="2차 비밀번호"
          type={togglePwd ? "text" : "password"}
          placeholder="비밀번호를 입력하세요."
          headIcon={<LockClosedIcon />}
          tailIcon={<EyeIcon />}
          stateTrueTailIcon={<EyeSlashIcon />}
          fnState={toogleCheckPwd}
          fn={() => setToggleCheckPwd((prev) => !prev)}
          errMsg={
            (state.errMsg?.properties &&
              state.errMsg.properties.passwordCheck?.errors) ??
            []
          }
        />
        <AuthInput
          id="name"
          name="name"
          type="text"
          labelTxt="이름"
          placeholder="이름을 입력하세요."
          headIcon={<UserIcon />}
          errMsg={
            (state.errMsg?.properties &&
              state.errMsg.properties.name?.errors) ??
            []
          }
        />
        <AuthInput
          id="birth"
          name="birth"
          type="date"
          labelTxt="생년월일"
          placeholder="생년월일을 입력하세요."
          headIcon={<CalendarIcon />}
          classNames="pr-2"
          errMsg={
            (state.errMsg?.properties &&
              state.errMsg.properties.birth?.errors) ??
            []
          }
        />
        <JoinAddress />
      </fieldset>
      <button
        formAction={action}
        type="submit"
        className={`${
          ableStatus.pwd && ableStatus.email
            ? "bg-(--mt-gray) cursor-default!"
            : "bg-(--mt-blue) hover:bg-(--mt-blue-point)"
        } text-(--mt-white) py-2 rounded-lg shadow-md font-bold transition-colors duration-200 ease-in-out
        `}
        disabled={(ableStatus.pwd && ableStatus.email) ?? isPending}
      >
        회원가입
      </button>
    </form>
  );
}
