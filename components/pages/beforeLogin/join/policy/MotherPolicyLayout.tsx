"use client";

import {usePolicyState} from "@/stores/joinState";
import {ReactNode, useId, useState} from "react";

export default function MotherPolicyLayout({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const inputId = useId();
  const [agree, setAgree] = useState(0);
  const [disable, setDisable] = useState(true);
  const {offset, setNextOffset} = usePolicyState();

  return (
    <div className="flex flex-col gap-3">
      {children}
      <div className="flex justify-center items-center gap-3 ">
        <div className="flex items-center gap-3">
          <label htmlFor={`${inputId}_pass`}>동의함</label>
          <input
            id={`${inputId}_pass`}
            name={name}
            type="radio"
            onChange={() => setAgree(1)}
            value={1}
            checked={agree === 1}
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor={`${inputId}_nonpass`}>동의안함</label>
          <input
            id={`${inputId}_nonpass`}
            name={name}
            type="radio"
            onChange={() => setAgree(0)}
            value={0}
            checked={agree === 0}
          />
        </div>
      </div>
      <button
        type="button"
        className="bg-(--mt-blue-point) py-2 font-bold text-(--mt-white) rounded-lg"
        onClick={setNextOffset}
      >
        다음
      </button>
    </div>
  );
}
