import {ReactNode} from "react";

export default function JoinPolicyLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col gap-1 p-3 bg-(--mt-gray-smoke) h-[700px] overflow-auto break-all ">
      {children}
    </div>
  );
}
