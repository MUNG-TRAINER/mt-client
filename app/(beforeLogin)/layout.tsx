import {ReactNode} from "react";

export default function BeforeLoginLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col gap-3 p-6 w-full h-[800px] bg-(--mt-white) rounded-2xl m-auto overflow-x-hidden">
      {children}
    </div>
  );
}
