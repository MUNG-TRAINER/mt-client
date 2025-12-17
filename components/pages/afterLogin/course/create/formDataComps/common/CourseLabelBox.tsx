import {ReactNode} from "react";

export default function CourseLabelBox({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col gap-1 [&>label]:font-bold">{children}</div>
  );
}
