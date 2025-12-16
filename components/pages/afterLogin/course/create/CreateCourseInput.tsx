import {InputHTMLAttributes} from "react";
interface ICreateCourseInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  classNames?: string;
}
export default function CreateCourseInput({
  classNames = "",
  ...props
}: ICreateCourseInputProps) {
  return (
    <input
      {...props}
      className={`w-full p-2 rounded-md bg-(--mt-gray-light) border border-(--mt-gray) ${classNames}`}
    />
  );
}
