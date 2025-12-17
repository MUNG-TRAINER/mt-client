"use client";

import {InputHTMLAttributes, RefObject, useId} from "react";

interface ICourseTypeBtnProps extends InputHTMLAttributes<HTMLInputElement> {
  labelFor: string;
  labelTxt: string;
  inputRef: RefObject<HTMLInputElement | null>;
  inputValue: string;
  isActive: boolean;
  handleFn: () => void;
}

export default function CourseTypeBtn({
  labelFor,
  labelTxt,
  inputRef,
  inputValue,
  isActive,
  handleFn,
  ...props
}: ICourseTypeBtnProps) {
  const id = useId();
  return (
    <div className="w-full">
      <label
        htmlFor={`${id}_${labelFor}`}
        onClick={handleFn}
        className={`${
          isActive
            ? "bg-(--mt-blue-point) text-(--mt-white)"
            : "border border-(--mt-gray) bg-(--mt-gray-light) text-(--mt-gray)"
        } flex items-center justify-center p-2 rounded-md w-full text-center`}
      >
        {labelTxt}
      </label>
      <input
        ref={inputRef}
        id={`${id}_${labelFor}`}
        type="radio"
        className="size-0"
        value={inputValue}
        {...props}
        hidden
      />
    </div>
  );
}
