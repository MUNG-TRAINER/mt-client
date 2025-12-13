"use client";

import {CalendarIcon} from "@/components/icons/calendar";
import {CheckCircleIcon} from "@/components/icons/check";
import {CodeBracketIcon} from "@/components/icons/code";
import {EnvelopeIcon} from "@/components/icons/envelope";
import {EyeIcon, EyeSlashIcon} from "@/components/icons/eye";
import {LockClosedIcon} from "@/components/icons/lock";
import {UserIcon} from "@/components/icons/user";
import AuthInput from "@/components/shared/inputs/AuthInput";
import {joinTrainerSchema, joinUserSchema} from "@/schemas/joinSchema";
import {IFormResultType} from "@/types/formResultType";
import {Dispatch, SetStateAction} from "react";

type IJoinRequiredInputStateProps = {
  state:
    | IFormResultType<typeof joinTrainerSchema>
    | IFormResultType<typeof joinUserSchema>;
  checkUserName: boolean;
  checkEmail: boolean;
  togglePwd: boolean;
  toggleCheckPwd: boolean;
  isTrainer: boolean;
};
type IJoinRequiredInputFnProps = {
  setUserNameInput: Dispatch<SetStateAction<string>>;
  setEmailInput: Dispatch<SetStateAction<string>>;
  handleCheckUserName: () => Promise<void>;
  handleCheckEmail: () => Promise<void>;
  setTogglePwd: Dispatch<SetStateAction<boolean>>;
  setToggleCheckPwd: Dispatch<SetStateAction<boolean>>;
};
interface IJoinRequiredInputProps
  extends IJoinRequiredInputStateProps,
    IJoinRequiredInputFnProps {}

export default function JoinRequiredInputs({
  state,
  checkUserName,
  checkEmail,
  togglePwd,
  toggleCheckPwd,
  isTrainer,
  setUserNameInput,
  setEmailInput,
  handleCheckUserName,
  handleCheckEmail,
  setTogglePwd,
  setToggleCheckPwd,
}: IJoinRequiredInputProps) {
  return (
    <>
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
        labelTxt="전화번호"
        placeholder="전화번호를 입력하세요."
        headIcon={<UserIcon />}
        errMsg={
          (state.errMsg?.properties && state.errMsg.properties.phone?.errors) ??
          []
        }
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
          (state.errMsg?.properties &&
            state.errMsg.properties.password?.errors) ??
          []
        }
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
        fn={() => setToggleCheckPwd((prev) => !prev)}
        errMsg={
          (state.errMsg?.properties &&
            state.errMsg.properties.passwordCheck?.errors) ??
          []
        }
        required
      />
      <AuthInput
        id="name"
        name="name"
        type="text"
        labelTxt="이름"
        placeholder="이름을 입력하세요."
        headIcon={<UserIcon />}
        errMsg={
          (state.errMsg?.properties && state.errMsg.properties.name?.errors) ??
          []
        }
        required
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
          (state.errMsg?.properties && state.errMsg.properties.birth?.errors) ??
          []
        }
        required
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
          required
        />
      )}
    </>
  );
}
