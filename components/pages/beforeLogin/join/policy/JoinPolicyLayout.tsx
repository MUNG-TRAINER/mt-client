import {ReactNode} from "react";

export default function JoinPolicyLayout({children}: {children: ReactNode}) {
  return (
    <div className="p-3 bg-(--mt-gray-smoke) h-[700px] overflow-y-scroll">
      {children}
    </div>
  );
}
