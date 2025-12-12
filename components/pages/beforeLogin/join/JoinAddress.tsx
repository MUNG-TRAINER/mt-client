import {BuildingOffice2Icon, HomeIcon} from "@/components/icons/home";
import {MapIcon, MapPinIcon} from "@/components/icons/location";
import AuthInput from "@/components/shared/inputs/AuthInput";
import {onClickAddr} from "@/util/address/address";
import {useState} from "react";

export default function JoinAddress() {
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [roadname, setRoadName] = useState("");
  const [postcode, setPostCode] = useState("");
  return (
    <>
      <div
        onClick={() =>
          onClickAddr({setSido, setSigungu, setRoadName, setPostCode})
        }
        className="cursor-pointer"
      >
        <AuthInput
          id="sido"
          name="sido"
          type="text"
          labelTxt="도시/시"
          placeholder="도시를 입력하세요."
          headIcon={<MapPinIcon />}
          value={sido}
          readOnly
        />
        <AuthInput
          id="sigungu"
          name="sigungu"
          type="text"
          labelTxt="시/군/구"
          placeholder="시/군/구를 입력하세요."
          headIcon={<MapIcon />}
          value={sigungu}
          readOnly
        />
        <AuthInput
          id="roadname"
          name="roadname"
          type="text"
          labelTxt="도로명주소"
          placeholder="도로명주소를 입력하세요."
          headIcon={<HomeIcon />}
          value={roadname}
          readOnly
        />
        <AuthInput
          id="postcode"
          name="postcode"
          type="text"
          labelTxt="우편번호"
          placeholder="우편번호를 입력하세요."
          headIcon={<HomeIcon />}
          value={postcode}
          readOnly
        />
      </div>
      <AuthInput
        id="restAddress"
        name="restAddress"
        type="text"
        labelTxt="나머지주소"
        placeholder="나머지주소를 입력하세요."
        headIcon={<BuildingOffice2Icon />}
      />
    </>
  );
}
