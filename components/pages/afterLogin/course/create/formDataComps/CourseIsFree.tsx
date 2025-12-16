"use client";

import {useCallback, useRef, useState} from "react";
import CourseTypeBtn from "./common/CourseTypeBtn";

export default function CourseIsFree() {
  const [state, setState] = useState(true);
  const [price, setPrice] = useState("");
  const freeRef = useRef<HTMLInputElement | null>(null);
  const nonFreeRef = useRef<HTMLInputElement | null>(null);
  /* fn */
  const handleTruePrice = useCallback(() => {
    setPrice("");
    setState(true);
  }, []);
  const handleFalsePrice = useCallback(() => {
    setPrice("0");
    setState(false);
  }, []);
  return (
    <>
      <h5 className="font-bold">유료 / 무료</h5>
      <div className="w-full flex justify-around *:w-full">
        <CourseTypeBtn
          labelFor={"free"}
          labelTxt={"무료"}
          inputRef={freeRef}
          name="isFree"
          inputValue={"true"}
          isActive={state}
          handleFn={handleTruePrice}
          defaultChecked
        />
        <CourseTypeBtn
          labelFor={"nonFree"}
          labelTxt={"유료"}
          name="isFree"
          inputRef={nonFreeRef}
          inputValue={"false"}
          isActive={!state}
          handleFn={handleFalsePrice}
        />
      </div>
    </>
  );
}
