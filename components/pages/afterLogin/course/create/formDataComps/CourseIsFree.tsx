"use client";

import {useCallback, useRef} from "react";
import CourseTypeBtn from "./common/CourseTypeBtn";
import {useSessionState} from "@/stores/sessionState";

export default function CourseIsFree() {
  const {free, setFreeTrue, setFreeFalse, setPrice} = useSessionState();

  const freeRef = useRef<HTMLInputElement | null>(null);
  const nonFreeRef = useRef<HTMLInputElement | null>(null);
  /* fn */
  const handleTruePrice = useCallback(() => {
    setPrice(0);
    setFreeTrue();
  }, [setFreeTrue, setPrice]);
  const handleFalsePrice = useCallback(() => {
    setPrice(null);
    setFreeFalse();
  }, [setFreeFalse, setPrice]);
  return (
    <div className="flex flex-col gap-2 justify-around *:flex *:gap-2">
      <h5 className="font-bold">유료 / 무료</h5>
      <div className="w-full flex justify-around *:w-full">
        <CourseTypeBtn
          labelFor={"free"}
          labelTxt={"무료"}
          inputRef={freeRef}
          name="isFree"
          inputValue={"true"}
          isActive={free}
          handleFn={handleTruePrice}
          defaultChecked
        />
        <CourseTypeBtn
          labelFor={"nonFree"}
          labelTxt={"유료"}
          name="isFree"
          inputRef={nonFreeRef}
          inputValue={"false"}
          isActive={!free}
          handleFn={handleFalsePrice}
        />
      </div>
    </div>
  );
}
