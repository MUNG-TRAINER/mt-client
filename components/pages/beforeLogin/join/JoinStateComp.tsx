"use client";

import {useJoinState, usePolicyState} from "@/stores/joinState";

export default function JoinStateComp() {
  const {isTrainer, toggleIsTrainer, resetToggleIsAgree} = useJoinState();
  const {setZeroOffset, setResetPolicy} = usePolicyState();
  const handleToggleState = () => {
    toggleIsTrainer();
    setZeroOffset();
    resetToggleIsAgree();
    setResetPolicy();
  };
  return (
    <div
      className={`relative w-full h-32 mx-auto flex justify-around items-center py-1 before:absolute before:left-0 before:top-0 before:content-[''] before:w-[50%] before:h-full before:border-2 before:border-x-0 before:border-t-0 before:transition-transform before:duration-200 before:ease-in-out ${
        isTrainer
          ? "before:translate-x-0  before:border-b-(--mt-blue)"
          : "before:translate-x-full  before:border-b-(--mt-red)"
      } *:font-semibold *:w-full *:h-full`}
    >
      <button
        onClick={handleToggleState}
        className={`${isTrainer && "bg-(--mt-blue-light)"}`}
      >
        훈련사로 가입
      </button>
      <button
        onClick={handleToggleState}
        className={`${!isTrainer && "bg-(--mt-red-smoke)"}`}
      >
        보호자로 가입
      </button>
    </div>
  );
}
