"use client";

import {useActionState, useEffect, useState} from "react";
import JoinAddress from "./JoinAddress";
import {
  joinTrainerAction,
  joinUserAction,
} from "@/app/(beforeLogin)/join/actions";
import useCheckValidation from "@/hooks/beforeLogin/join/useCheckValidation";
import {useJoinState, usePolicyState} from "@/stores/joinState";
import JoinTrainerTerm from "./policy/JoinTrainerTerm";
import JoinPrivacyPolicy from "./policy/JoinPrivacyPolicy";
import JoinUserTerm from "./policy/JoinUserTerm";
import JoinRequiredInputs from "./JoinRequiredInputs";
import getOS from "@/util/getOS";

const initailState = {
  errMsg: undefined,
  resMsg: undefined,
};

export default function JoinForm() {
  const os = getOS();
  const isIos = os === "ios";
  const isAndroid = os === "android";
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
  const {offset, setZeroOffset, setResetPolicy} = usePolicyState();
  const {resetToggleIsAgree} = useJoinState();
  const {
    checkUserName,
    checkEmail,
    ableStatus,
    handleCheckUserName,
    handleCheckEmail,
    handleResetState,
  } = useCheckValidation({userNameInput, emailInput});

  //fn
  const handleTranlateX = (offset: number) => {
    return isIos || isAndroid
      ? `translateX(-${offset}px)`
      : `translateX(-${offset}%)`;
  };

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
    setZeroOffset();
    setResetPolicy();
    resetToggleIsAgree();
  }, [
    state,
    handleResetState,
    setZeroOffset,
    setResetPolicy,
    resetToggleIsAgree,
  ]);

  return (
    <form action={action} className="flex overflow-x-hidden py-2">
      <div
        className="flex transition-transform duration-200 ease-in-out 
        *:min-w-full [body[data-os=ios]_&]:*:min-w-[335px] [body[data-os=android]_&]:*:min-w-[315px]"
        style={{transform: handleTranlateX(offset)}}
      >
        {isTrainer ? <JoinTrainerTerm /> : <JoinUserTerm />}
        <JoinPrivacyPolicy />
        <fieldset className="flex flex-col gap-3 overflow-x-hidden">
          <legend>회원가입</legend>
          <div className="flex flex-col gap-2">
            <JoinRequiredInputs
              state={state}
              checkUserName={checkUserName}
              checkEmail={checkEmail}
              togglePwd={togglePwd}
              toggleCheckPwd={toggleCheckPwd}
              isTrainer={isTrainer}
              setUserNameInput={setUserNameInput}
              setEmailInput={setEmailInput}
              handleCheckUserName={handleCheckUserName}
              handleCheckEmail={handleCheckEmail}
              setTogglePwd={setTogglePwd}
              setToggleCheckPwd={setToggleCheckPwd}
            />
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
        </fieldset>
      </div>
    </form>
  );
}
