"use client";

import {useJoinState} from "@/stores/joinState";

export default function JoinStateComp() {
  const {isTrainer, toggleIsTrainer} = useJoinState();
  return (
    <div
      className={`relative w-80 h-32 mx-auto flex justify-around items-center py-1 before:absolute before:left-0 before:top-0 before:content-[''] before:w-[50%] before:h-full before:border-2 before:border-x-0 before:border-t-0 before:transition-transform before:duration-200 before:ease-in-out ${
        isTrainer
          ? "before:translate-x-0  before:border-b-(--mt-blue)"
          : "before:translate-x-full  before:border-b-(--mt-red)"
      } *:font-semibold *:w-full *:h-full`}
    >
      <button onClick={toggleIsTrainer}>훈련사</button>
      <button onClick={toggleIsTrainer}>보호자</button>
    </div>
  );
}
