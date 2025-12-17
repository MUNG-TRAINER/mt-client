"use client";

import {InputHTMLAttributes, useId} from "react";
import CreateCourseInput from "../../CreateCourseInput";
import CourseLabelBox from "../common/CourseLabelBox";

interface ISessionPriceProps extends InputHTMLAttributes<HTMLInputElement> {
  index: number;
  inputId: string;
  state: boolean;
  classNames?: string;
}
export default function SessionPrice({
  index,
  inputId,
  state = false,
  classNames = "",
  ...props
}: ISessionPriceProps) {
  const id = useId();
  return (
    <CourseLabelBox>
      <label htmlFor={`${id}_${index}_${inputId}`}>가격</label>
      <div className="flex items-center gap-2">
        <CreateCourseInput
          id={`${id}_${index}_${inputId}`}
          classNames={classNames}
          {...props}
          readOnly={state}
        />
        <span className="font-bold">원</span>
      </div>
    </CourseLabelBox>
  );
}
