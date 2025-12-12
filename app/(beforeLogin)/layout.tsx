import {ReactNode} from "react";

export default function BeforeLoginLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col justify-center gap-3 p-6 w-[404px] h-[700px] bg-(--mt-white) rounded-2xl m-auto">
      {children}
    </div>
  );
}
