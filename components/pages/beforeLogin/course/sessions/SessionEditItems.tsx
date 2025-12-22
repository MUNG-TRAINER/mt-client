import {InputHTMLAttributes, ReactNode} from "react";

interface ISessionEditInputs extends InputHTMLAttributes<HTMLInputElement> {
  icons: ReactNode;
  labelId: string;
  labelTxt: string;
}

export default function SessionEditInputs({
  icons,
  labelId,
  labelTxt,
  ...props
}: ISessionEditInputs) {
  return (
    <div className="flex items-start gap-2">
      {icons}
      <div className="flex flex-col gap-1">
        <label htmlFor={labelId} className="text-xs text-(--mt-gray)">
          {labelTxt}
        </label>
        <input
          id={labelId}
          name={labelId}
          className="text-sm text-(--mt-black) border border-(--mt-gray-point) px-2 py-1 rounded-md"
          {...props}
        />
      </div>
    </div>
  );
}
