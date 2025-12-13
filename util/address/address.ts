import {Dispatch, SetStateAction} from "react";

interface IOnClickAddrProps {
  setSido: Dispatch<SetStateAction<string>>;
  setSigungu: Dispatch<SetStateAction<string>>;
  setRoadName: Dispatch<SetStateAction<string>>;
  setPostCode: Dispatch<SetStateAction<string>>;
}
interface IAddr {
  sido: string;
  sigungu: string;
  roadname: string;
  zonecode: string;
}

export const onClickAddr = ({
  setSido,
  setSigungu,
  setRoadName,
  setPostCode,
}: IOnClickAddrProps) => {
  if (!window.daum?.Postcode) {
    return;
  }
  new window.daum.Postcode({
    oncomplete: function ({sido, sigungu, roadname, zonecode}: IAddr) {
      setSido(sido);
      setSigungu(sigungu);
      setRoadName(roadname);
      setPostCode(zonecode);
    },
  }).open();
};
