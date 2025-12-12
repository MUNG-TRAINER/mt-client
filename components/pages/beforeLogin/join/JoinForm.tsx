"use client";

import {EnvelopeIcon} from "@/components/icons/envelope";
import {EyeIcon, EyeSlashIcon} from "@/components/icons/eye";
import {LockClosedIcon} from "@/components/icons/lock";
import {UserIcon} from "@/components/icons/user";
import AuthInput from "@/components/shared/inputs/AuthInput";
import {useActionState, useEffect, useState} from "react";
import JoinAddress from "./JoinAddress";
import {
  joinTrainerAction,
  joinUserAction,
} from "@/app/(beforeLogin)/join/actions";
import {CalendarIcon} from "@/components/icons/calendar";
import {CheckCircleIcon} from "@/components/icons/check";
import useCheckValidation from "@/hooks/beforeLogin/join/useCheckValidation";
import Link from "next/link";
import {useJoinState, usePolicyState} from "@/stores/joinState";
import {CodeBracketIcon} from "@/components/icons/code";
import JoinTrainerTerm from "./policy/JoinTrainerTerm";
import JoinPrivacyPolicy from "./policy/JoinPrivacyPolicy";
import JoinUserTerm from "./policy/JoinUserTerm";

const initailState = {
  errMsg: undefined,
  resMsg: undefined,
};

export default function JoinForm() {
  const [togglePwd, setTogglePwd] = useState(false);
  const [toggleCheckPwd, setToggleCheckPwd] = useState(false);
  const [userNameInput, setUserNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const {isTrainer} = useJoinState();
  // form action
  const [state, action] = useActionState(
    isTrainer ? joinTrainerAction : joinUserAction,
    initailState
  );
  // Custom Hook
  const {offset} = usePolicyState();
  const {
    checkUserName,
    checkEmail,
    ableStatus,
    handleCheckUserName,
    handleCheckEmail,
    handleResetState,
  } = useCheckValidation({userNameInput, emailInput});
  // useEffect
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
  useEffect(() => {
    handleResetState();
  }, [state, handleResetState]);
  return (
    <form action={action} className="flex overflow-x-hidden py-2">
      <div
        className={`flex *:min-w-[356px]  transition-transform duration-200 ease-in-out`}
        style={{transform: `translateX(-${offset}px)`}}
      >
        {isTrainer ? <JoinTrainerTerm /> : <JoinUserTerm />}
        <JoinPrivacyPolicy />
        <fieldset className="overflow-x-hidden">
          <legend>회원가입</legend>
          <div className="flex flex-col gap-2">
            <div className="flex  items-center gap-2">
              <AuthInput
                id="userName"
                name="userName"
                type="text"
                labelTxt="아이디"
                placeholder="아이디를 입력하세요."
                headIcon={<UserIcon />}
                onChange={(e) => setUserNameInput(e.target.value)}
                errMsg={
                  (state.errMsg?.properties &&
                    state.errMsg.properties.userName?.errors) ??
                  []
                }
                tailIcon={<CheckCircleIcon className="text-red-500" />}
                stateTrueTailIcon={
                  <CheckCircleIcon className="text-green-500" />
                }
                fnState={checkUserName}
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
                onChange={(e) => setEmailInput(e.target.value)}
                errMsg={
                  (state.errMsg?.properties &&
                    state.errMsg.properties.email?.errors) ??
                  []
                }
                tailIcon={<CheckCircleIcon className="text-red-500" />}
                stateTrueTailIcon={
                  <CheckCircleIcon className="text-green-500" />
                }
                fnState={checkEmail}
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
              type={toggleCheckPwd ? "text" : "password"}
              placeholder="비밀번호를 입력하세요."
              headIcon={<LockClosedIcon />}
              tailIcon={<EyeIcon />}
              stateTrueTailIcon={<EyeSlashIcon />}
              fnState={toggleCheckPwd}
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
            {!isTrainer && (
              <AuthInput
                id="registCode"
                name="registCode"
                type="text"
                labelTxt="코드"
                placeholder="코드를 입력하세요."
                headIcon={<CodeBracketIcon />}
                errMsg={
                  (state.errMsg?.properties &&
                    state.errMsg.properties.registCode?.errors) ??
                  []
                }
              />
            )}
            <JoinAddress />
          </div>
          <button
            formAction={action}
            type="submit"
            className={`${
              ableStatus.userName || ableStatus.email
                ? "bg-(--mt-gray) cursor-default!"
                : "bg-(--mt-blue) hover:bg-(--mt-blue-point)"
            } text-(--mt-white) py-2 rounded-lg shadow-md font-bold transition-colors duration-200 ease-in-out
        `}
            disabled={ableStatus.userName || ableStatus.email}
          >
            회원가입
          </button>
          <p className="flex items-center gap-2 justify-center text-center text-sm font-semibold text-(--mt-gray)">
            회원이신가요?
            <Link href={"/login"} className="text-(--mt-blue)">
              로그인
            </Link>
          </p>
        </fieldset>
      </div>
    </form>
  );
}
