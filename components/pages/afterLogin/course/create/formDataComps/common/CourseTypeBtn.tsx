"use client";

import {InputHTMLAttributes, RefObject, useId} from "react";

interface ICourseTypeBtnProps extends InputHTMLAttributes<HTMLInputElement> {
  labelFor: string;
  labelTxt: string;
  ref: RefObject<HTMLInputElement | null>;
  inputValue: string;
  isActive: boolean;
  handleFn: () => void;
}

export default function CourseTypeBtn({
  labelFor,
  labelTxt,
  ref,
  inputValue,
  isActive,
  handleFn,
  ...props
}: ICourseTypeBtnProps) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={`${id}_${labelFor}`}
        onClick={handleFn}
        className={`${
          isActive
            ? "bg-(--mt-blue-point) text-(--mt-white)"
            : "border border-(--mt-gray) bg-(--mt-gray-light) text-(--mt-gray)"
        } block p-2 rounded-md w-full text-center`}
      >
        {labelTxt}
      </label>
      <input
        ref={ref}
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
