"use client";

import {CalendarIcon} from "@/components/icons/calendar";
import {CheckCircleIcon} from "@/components/icons/check";
import {CodeBracketIcon} from "@/components/icons/code";
import {EnvelopeIcon} from "@/components/icons/envelope";
import {EyeIcon, EyeSlashIcon} from "@/components/icons/eye";
import {LockClosedIcon} from "@/components/icons/lock";
import {UserIcon} from "@/components/icons/user";
import AuthInput from "@/components/shared/inputs/AuthInput";
import {useJoinRequiredInputState} from "@/stores/join/joinRequiredInputState";
import {
  IJoinRequiredInputProps,
  TErrorStates,
} from "@/types/join/joinRequiredInputType";
import {useState} from "react";

export default function JoinRequiredInputs({
  state,
  checkUserName,
  checkEmail,
  togglePwd,
  toggleCheckPwd,
  isTrainer,
  handleCheckUserName,
  handleCheckEmail,
  setTogglePwd,
  setToggleCheckPwd,
}: IJoinRequiredInputProps) {
  const now = new Date();
  const [errState, setErrState] = useState<Set<TErrorStates>>(new Set(null));
  const {
    userName,
    setUserName,
    email,
    setEmail,
    phone,
    setPhone,
    birth,
    setBirth,
    name,
    setName,
    registCode,
    setRegistCode,
  } = useJoinRequiredInputState();
  // Errors
  const handleErrorState = (field: TErrorStates, fn: () => void) => {
    if (field && !state.errMsg?.properties?.[field]) return;
    setErrState((prev) => {
      const prevSet = new Set(prev);
      prevSet.add(field);
      return prevSet;
    });
    fn();
  };
  const userErrors = errState.has("userName")
    ? []
    : state.errMsg?.properties?.userName?.errors;
  const emailErrors = errState.has("email")
    ? []
    : state.errMsg?.properties?.email?.errors;
  const phoneErrors = errState.has("phone")
    ? []
    : state.errMsg?.properties?.phone?.errors;
  const passwordErrors = errState.has("password")
    ? []
    : state.errMsg?.properties?.password?.errors;
  const passwordCheckErrors = errState.has("passwordCheck")
    ? []
    : state.errMsg?.properties?.passwordCheck?.errors;
  const nameErrors = errState.has("name")
    ? []
    : state.errMsg?.properties?.name?.errors;
  const birthErrors = errState.has("birth")
    ? []
    : state.errMsg?.properties?.birth?.errors;
  const registCodeErrors = errState.has("registCode")
    ? []
    : state.errMsg?.properties?.registCode?.errors;

  return (
    <>
      <div className="flex  items-center gap-2">
        <AuthInput
          id="userName"
          name="userName"
          type="text"
          labelTxt="아이디"
          value={userName}
          placeholder="아이디를 입력하세요."
          headIcon={<UserIcon />}
          onChange={(e) =>
            handleErrorState("userName", () => setUserName(e.target.value))
          }
          errMsg={userErrors}
          tailIcon={<CheckCircleIcon className="text-red-500" />}
          stateTrueTailIcon={<CheckCircleIcon className="text-green-500" />}
          fnState={checkUserName}
          required
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
          value={email}
          labelTxt="이메일"
          placeholder="이메일을 입력하세요."
          headIcon={<EnvelopeIcon />}
          onChange={(e) =>
            handleErrorState("email", () => setEmail(e.target.value))
          }
          errMsg={emailErrors}
          tailIcon={<CheckCircleIcon className="text-red-500" />}
          stateTrueTailIcon={<CheckCircleIcon className="text-green-500" />}
          fnState={checkEmail}
          required
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
        value={phone}
        onChange={(e) =>
          handleErrorState("email", () => setPhone(e.target.value))
        }
        labelTxt="전화번호"
        placeholder="전화번호를 입력하세요."
        headIcon={<UserIcon />}
        errMsg={phoneErrors}
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
        onChange={() => handleErrorState("password", () => {})}
        fn={() => setTogglePwd((prev) => !prev)}
        errMsg={passwordErrors}
        required
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
        onChange={() => handleErrorState("passwordCheck", () => {})}
        fn={() => setToggleCheckPwd((prev) => !prev)}
        errMsg={passwordCheckErrors}
        required
      />
      <AuthInput
        id="name"
        name="name"
        type="text"
        value={name}
        onChange={(e) =>
          handleErrorState("name", () => setName(e.target.value))
        }
        labelTxt="이름"
        placeholder="이름을 입력하세요."
        headIcon={<UserIcon />}
        errMsg={nameErrors}
        required
      />
      <AuthInput
        id="birth"
        name="birth"
        type="date"
        value={birth}
        onChange={(e) =>
          handleErrorState("birth", () => setBirth(e.target.value))
        }
        labelTxt="생년월일"
        placeholder="생년월일을 입력하세요."
        headIcon={<CalendarIcon />}
        classNames="pr-2"
        max={`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`}
        errMsg={birthErrors}
        required
      />
      {!isTrainer && (
        <AuthInput
          id="registCode"
          name="registCode"
          type="text"
          value={registCode}
          onChange={(e) =>
            handleErrorState("registCode", () => setRegistCode(e.target.value))
          }
          labelTxt="코드"
          placeholder="코드를 입력하세요."
          headIcon={<CodeBracketIcon />}
          errMsg={registCodeErrors}
          required
        />
      )}
    </>
  );
}
