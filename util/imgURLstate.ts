import {ChangeEvent, Dispatch, SetStateAction} from "react";

export const handleChangeImg = (
  e: ChangeEvent<HTMLInputElement>,
  fn: Dispatch<SetStateAction<string>>,
) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  fn(url);
};
