import {InputHTMLAttributes, RefObject} from "react";
interface ICreateCourseInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: RefObject<HTMLInputElement | null>;
  classNames?: string;
}
export default function CreateCourseInput({
  inputRef,
  classNames = "",
  ...props
}: ICreateCourseInputProps) {
  return (
    <input
      ref={inputRef}
      {...props}
      className={`w-full p-2 rounded-md bg-(--mt-gray-light) border border-(--mt-gray) ${classNames}`}
    />
  );
}
