import {HtmlHTMLAttributes, ReactNode} from "react";

interface IHeaderBarProps extends HtmlHTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export default function HeaderBar({children, ...props}: IHeaderBarProps) {
  return (
    <header {...props}>
      <nav className="p-4">
        <ul className="flex justify-between items-center gap-5">{children}</ul>
      </nav>
    </header>
  );
}
