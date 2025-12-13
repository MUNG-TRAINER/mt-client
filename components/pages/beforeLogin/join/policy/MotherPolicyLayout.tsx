"use client";

import {usePolicyState} from "@/stores/joinState";
import {IMotherPolicyType} from "@/types/components/motherPolicyType";
import {useId} from "react";

export default function MotherPolicyLayout({
  name,
  radioState,
  radioStateFn,
  policyState,
  policyStateFn,
  children,
}: IMotherPolicyType) {
  const inputId = useId();
  const {setNextOffset} = usePolicyState();
  const handleChange = (index: number) => {
    radioStateFn(index);
    policyStateFn();
  };
  return (
    <div className="flex flex-col items-center gap-3">
      {children}
      <div className="flex justify-center items-center gap-3 ">
        <div className="flex items-center gap-3">
          <label htmlFor={`${inputId}_pass`}>동의함</label>
          <input
            id={`${inputId}_pass`}
            name={name}
            type="radio"
            onChange={() => handleChange(1)}
            value={1}
            checked={radioState === 1}
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor={`${inputId}_nonpass`}>동의안함</label>
          <input
            id={`${inputId}_nonpass`}
            name={name}
            type="radio"
            onChange={() => handleChange(0)}
            value={0}
            checked={radioState === 0}
          />
        </div>
      </div>
      <button
        type="button"
        className={`${
          policyState ? "bg-(--mt-gray)" : "bg-(--mt-blue-point)"
        } w-full py-2 font-bold text-(--mt-white) rounded-lg transition-colors duration-200 ease-in-out`}
        disabled={policyState}
        onClick={setNextOffset}
      >
        {policyState ? "동의여부를 눌러주세요." : "다음"}
      </button>
    </div>
  );
}
