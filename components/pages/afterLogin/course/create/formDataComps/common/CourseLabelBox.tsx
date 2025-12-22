import {ReactNode} from "react";

export default function CourseLabelBox({
  children,
  classNames = "",
}: {
  children: ReactNode;
  classNames?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 [&>label]:font-bold ${classNames}`}>
      {children}
    </div>
  );
}
