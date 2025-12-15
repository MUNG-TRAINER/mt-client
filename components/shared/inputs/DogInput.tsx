import { IDogInputType } from "@/types/components/inputTypes";
import { useId } from "react";

export default function DogInput({
  labelTxt,
  id,
  name,
  type,
  placeholder = "",
  classNames = "",
  headIcon,
  tailIcon,
  stateTrueTailIcon,
  fnState = false,
  fn,
  errMsg,
  required = false,
  ...props
}: IDogInputType) {
  const labelId = useId();

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={`${labelId}_${id}`} className="font-bold">
        {labelTxt}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative flex items-center">
        {headIcon && (
          <i className="absolute size-5 ml-3 text-(--mt-gray)">{headIcon}</i>
        )}
        <input
          id={`${labelId}_${id}`}
          name={name}
          type={type}
          className={`border border-(--mt-gray-light) ${
            headIcon ? "pl-10" : "pl-3"
          } py-2 pr-10 w-full ${classNames} rounded-xl bg-(--mt-white)`}
          placeholder={placeholder}
          required={required}
          {...props}
        />
        {tailIcon && (
          <button
            onClick={fn}
            className="absolute right-0 mr-3 size-5"
            type="button"
          >
            {fnState ? (
              <i className="size-5 text-(--mt-gray)">{stateTrueTailIcon}</i>
            ) : (
              <i className="size-5 text-(--mt-gray)">{tailIcon}</i>
            )}
          </button>
        )}
      </div>
      <div className="flex flex-col">
        {errMsg &&
          errMsg.map((val, i) => (
            <small key={i} className="text-red-500">
              {val}
            </small>
          ))}
      </div>
    </div>
  );
}
