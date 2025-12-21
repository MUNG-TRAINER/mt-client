import {ReactNode} from "react";
interface ICreateCourseCard {
  children: ReactNode;
}
export default function CreateCourseCard({children}: ICreateCourseCard) {
  return (
    <div
      className={`flex flex-col gap-3 shadow p-3 rounded-md bg-(--mt-white) `}
    >
      {children}
    </div>
  );
}
