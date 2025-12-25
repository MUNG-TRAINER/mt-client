"use client";

import {TextareaHTMLAttributes, useId} from "react";
import CourseLabelBox from "./CourseLabelBox";
interface IDescriptionTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  index?: number;
  inputId: string;
  labelTxt: string;
  row?: number;
}
export default function CourseTextAtrea({
  index = 0,
  inputId,
  labelTxt,
  row = 3,
  ...props
}: IDescriptionTextAreaProps) {
  const id = useId();
  return (
    <CourseLabelBox>
      <label
        htmlFor={`${id}_${index}_${inputId}`}
        className="before:content-['*'] before:text-sm before:text-red-500 before:mr-1"
      >
        {labelTxt}
      </label>
      <textarea
        id={`${id}_${index}_${inputId}`}
        className="border border-(--mt-gray) p-2 rounded-md resize-none bg-(--mt-gray-light)"
        rows={row}
        {...props}
      />
    </CourseLabelBox>
  );
}
