"use client";

import {InputHTMLAttributes, useId} from "react";
import CreateCourseInput from "../../CreateCourseInput";

interface ISessionPriceProps extends InputHTMLAttributes<HTMLInputElement> {
  inputId: string;
  state?: boolean;
  classNames?: string;
}
export default function SessionPrice({
  inputId,
  state = false,
  classNames = "",
  ...props
}: ISessionPriceProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <h5 className="font-bold">가격</h5>
      <CreateCourseInput
        id={`${id}_${inputId}`}
        {...props}
        readOnly={state}
        classNames={classNames}
      />
    </div>
  );
}
