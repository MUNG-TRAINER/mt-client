"use client";

import {ChangeEvent, useCallback, useRef, useState} from "react";
import CreateCourseInput from "../CreateCourseInput";
import CourseTypeBtn from "./common/CourseTypeBtn";
import CourseCountBtn from "./courseType/CourseCountBtn";
import {useSessionState} from "@/stores/sessionState";
import SessionComp from "./session/SessionComp";

export default function CourseType() {
  const [isActive, setIsActive] = useState(true);
  const {count, setCount, handleCountMinus, handleCountPlus} =
    useSessionState();
  const onceRef = useRef<HTMLInputElement | null>(null);
  const multiRef = useRef<HTMLInputElement | null>(null);

  /* fn */
  const handleOnceActive = useCallback(() => {
    onceRef.current?.click();
    setIsActive(true);
    setCount(1);
  }, [setCount]);

  const handleMultiActive = useCallback(() => {
    multiRef.current?.click();
    setIsActive(false);
    setCount(1);
  }, [setCount]);

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 5) {
      setCount(5);
      return;
    }
    if (value < 1) {
      setCount(1);
      return;
    }
    setCount(Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-2">
      <h5 className="font-bold">회차 여부</h5>
      <div className="flex justify-between gap-3 *:flex *:items-center *:gap-2 ">
        <CourseTypeBtn
          labelFor="type_once"
          labelTxt="일회성 수업"
          inputRef={onceRef}
          isActive={isActive}
          handleFn={handleOnceActive}
          name="type"
          inputValue="ONCE"
          defaultChecked
        />
        <CourseTypeBtn
          labelFor="type_multi"
          labelTxt="다회성 수업"
          inputRef={multiRef}
          isActive={!isActive}
          handleFn={handleMultiActive}
          name="type"
          inputValue="MULTI"
        />
      </div>
      <div className="flex gap-3 items-center justify-between">
        <CreateCourseInput
          type="number"
          placeholder="최대 5회까지 가능합니다."
          min={1}
          max={5}
          onChange={handleCountChange}
          value={isActive ? "1" : count}
          readOnly={isActive}
          classNames={`${isActive && "text-(--mt-gray)"}`}
        />
        <CourseCountBtn
          disabled={isActive}
          minusFn={handleCountMinus}
          plusFn={handleCountPlus}
        />
      </div>
      <SessionComp count={count!} />
    </div>
  );
}
