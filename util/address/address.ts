interface IOnClickAddrProps {
  setSido: (sido: string) => void;
  setSigungu: (sigungu: string) => void;
  setRoadName: (roadName: string) => void;
  setPostCode: (postCode: string) => void;
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
