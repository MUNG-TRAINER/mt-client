import AuthInput from "@/components/shared/inputs/AuthInput";
import { BuildingOffice2Icon, HomeIcon } from "@/components/icons/home";
import { MapIcon, MapPinIcon } from "@/components/icons/location";
import { EnvelopeIcon } from "@/components/icons/envelope";
import { onClickAddr } from "@/util/address/address";
import { Dispatch, SetStateAction } from "react";

interface AddressInputsProps {
  sido: string;
  sigungu: string;
  roadname: string;
  postcode: string;
  restAddress: string;
  setSido: Dispatch<SetStateAction<string>>;
  setSigungu: Dispatch<SetStateAction<string>>;
  setRoadname: Dispatch<SetStateAction<string>>;
  setPostcode: Dispatch<SetStateAction<string>>;
  setRestAddress: Dispatch<SetStateAction<string>>;
}

export default function AddressInputs({
  sido,
  sigungu,
  roadname,
  postcode,
  restAddress,
  setSido,
  setSigungu,
  setRoadname,
  setPostcode,
  setRestAddress,
}: AddressInputsProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-(--mt-black)">주소</h3>
      <div
        onClick={() =>
          onClickAddr({
            setSido,
            setSigungu,
            setRoadName: setRoadname,
            setPostCode: setPostcode,
          })
        }
        className="cursor-pointer flex flex-col gap-2"
      >
        <AuthInput
          id="sido"
          name="sido"
          type="text"
          labelTxt="시/도"
          placeholder="주소를 검색하세요"
          headIcon={<MapPinIcon />}
          value={sido}
          readOnly
        />
        <AuthInput
          id="sigungu"
          name="sigungu"
          type="text"
          labelTxt="시/군/구"
          placeholder="주소를 검색하세요"
          headIcon={<MapIcon />}
          value={sigungu}
          readOnly
        />
        <AuthInput
          id="roadname"
          name="roadname"
          type="text"
          labelTxt="도로명주소"
          placeholder="주소를 검색하세요"
          headIcon={<HomeIcon />}
          value={roadname}
          readOnly
        />
        <AuthInput
          id="postcode"
          name="postcode"
          type="text"
          labelTxt="우편번호"
          placeholder="주소를 검색하세요"
          headIcon={<EnvelopeIcon />}
          value={postcode}
          readOnly
        />
      </div>
      <AuthInput
        id="restAddress"
        name="restAddress"
        type="text"
        labelTxt="나머지주소"
        placeholder="나머지주소를 입력하세요"
        headIcon={<BuildingOffice2Icon />}
        value={restAddress}
        onChange={(e) => setRestAddress(e.target.value)}
      />
    </div>
  );
}
