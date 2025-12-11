import {HTMLAttributes} from "react";

interface ITagBadges extends HTMLAttributes<HTMLSpanElement> {
  txt: string;
  classNames: string;
}
export default function TagBadges({
  txt,
  classNames = "",
  ...props
}: ITagBadges) {
  return (
    <span className={`px-4 py-2 rounded-2xl ${classNames}`} {...props}>
      {txt}
    </span>
  );
}
