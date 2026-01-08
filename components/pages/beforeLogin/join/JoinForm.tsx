"use client";

import {useActionState, useEffect, useState} from "react";
import JoinAddress from "./JoinAddress";
import {
  joinTrainerAction,
  joinUserAction,
} from "@/app/(beforeLogin)/join/actions";
import useCheckValidation from "@/hooks/beforeLogin/join/useCheckValidation";
import {useJoinState, usePolicyState} from "@/stores/join/joinState";
import JoinTrainerTerm from "./policy/JoinTrainerTerm";
import JoinPrivacyPolicy from "./policy/JoinPrivacyPolicy";
import JoinUserTerm from "./policy/JoinUserTerm";
import JoinRequiredInputs from "./JoinRequiredInputs";
import getOS from "@/util/getOS";
import {joinTrainerSchema, joinUserSchema} from "@/schemas/joinSchema";
import {IFormResultType} from "@/types/formResultType";
import {useRouter} from "next/navigation";
import {useJoinRequiredInputState} from "@/stores/join/joinRequiredInputState";

const initailState = {
  errMsg: undefined,
  resMsg: undefined,
};

export default function JoinForm() {
  const router = useRouter();
  const [togglePwd, setTogglePwd] = useState(false);
  const [toggleCheckPwd, setToggleCheckPwd] = useState(false);
  const {userName, email} = useJoinRequiredInputState();
  const {isTrainer} = useJoinState();
  // Custom Hook
  const os = getOS();
  const isIos = os === "ios";
  const isAndroid = os === "android";
  const {offset} = usePolicyState();
  const {
    checkUserName,
    checkEmail,
    unableStates,
    handleCheckUserName,
    handleCheckEmail,
    handleResetState,
  } = useCheckValidation({userName, email});

  // form action
  const [state, action, isPending] = useActionState(
    async (
      state: IFormResultType<typeof joinTrainerSchema | typeof joinUserSchema>,
      formData: FormData,
    ) => {
      let result: IFormResultType<
        typeof joinTrainerSchema | typeof joinUserSchema
      >;
      if (isTrainer) {
        result = await joinTrainerAction(state, formData);
      } else {
        result = await joinUserAction(state, formData);
      }
      if (result.errMsg || result.resMsg) {
        handleResetState();
      }
      if (!result.errMsg && !result.resMsg) {
        router.replace("/login");
      }
      return result;
    },
    initailState,
  );

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
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js",
    );
    document.body.appendChild(kakaoScript);
    return () => {
      document.body.removeChild(kakaoScript);
    };
  }, []);

  useEffect(() => {
    handleResetState();
  }, [handleResetState]);

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
              unableStates.userName || unableStates.email
                ? "bg-(--mt-gray) cursor-default!"
                : "bg-(--mt-blue) hover:bg-(--mt-blue-point)"
            } text-(--mt-white) py-2 rounded-lg shadow-md font-bold transition-colors duration-200 ease-in-out
        `}
            disabled={unableStates.userName || unableStates.email || isPending}
          >
            {isPending ? "가입중.." : "회원가입"}
          </button>
        </fieldset>
      </div>
    </form>
  );
}
