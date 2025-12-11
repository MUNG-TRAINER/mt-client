import {ReactNode} from "react";

export default function BeforeLoginLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col justify-center items-center gap-3 p-6 w-full h-[1000px] bg-white rounded-2xl m-auto">
      {children}
    </div>
  );
}
