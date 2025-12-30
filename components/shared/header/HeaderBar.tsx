"use client";
import {useAlertState} from "@/stores/alert/alertState";
import {HtmlHTMLAttributes, ReactNode} from "react";

interface IHeaderBarProps extends HtmlHTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export default function HeaderBar({children, ...props}: IHeaderBarProps) {
  const {resetAlertState} = useAlertState();
  return (
    <header {...props}>
      <nav className="p-4" onClick={resetAlertState}>
        <ul className="flex justify-between items-center gap-5">{children}</ul>
      </nav>
    </header>
  );
}
