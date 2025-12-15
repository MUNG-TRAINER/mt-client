import {ReactNode} from "react";
interface ICreateCourseCard {
  classNames?: string;
  children: ReactNode;
}
export default function CreateCourseCard({
  classNames = "",
  children,
}: ICreateCourseCard) {
  return (
    <div
      className={`flex flex-col gap-3 shadow p-3 rounded-md bg-(--mt-white) ${classNames}`}
    >
      {children}
    </div>
  );
}
