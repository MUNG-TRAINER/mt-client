import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {PhotoIcon} from "@/components/icons/photo";
import Image from "next/image";

export default function CourseImage() {
  const [mainImg, setMainImg] = useState("");
  const [detailImgOne, setDetailImgOne] = useState("");
  const [detailImgTwo, setDetailImgTwo] = useState("");
  const [detailImgThree, setDetailImgThree] = useState("");
  const mainImageRef = useRef<HTMLInputElement | null>(null);
  const detailImgRef_one = useRef<HTMLInputElement | null>(null);
  const detailImgRef_two = useRef<HTMLInputElement | null>(null);
  const detailImgRef_three = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    return () => {
      if (mainImg) {
        URL.revokeObjectURL(mainImg);
      }
      if (detailImgOne) {
        URL.revokeObjectURL(detailImgOne);
      }
      if (detailImgTwo) {
        URL.revokeObjectURL(detailImgTwo);
      }
      if (detailImgThree) {
        URL.revokeObjectURL(detailImgThree);
      }
    };
  }, [mainImg, detailImgOne, detailImgTwo, detailImgThree]);
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-bold">이미지 업로드</h3>
      <div className="w-full h-full flex">
        <ImageLabel
          imgUrl={mainImg}
          inputRef={mainImageRef}
          labelId="mainImageRef"
          name="mainImage"
          imgChang={setMainImg}
          details={true}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold">세부 이미지 업로드 (여러 장 첨부 가능)</h3>
        <div className="flex gap-3">
          <div className="w-full">
            <ImageLabel
              imgUrl={detailImgOne}
              inputRef={detailImgRef_one}
              labelId="detailImage[0].detailImage"
              name="detailImage[0].detailImage"
              imgChang={setDetailImgOne}
              details={false}
            />
          </div>
          <div className="w-full">
            <ImageLabel
              imgUrl={detailImgTwo}
              inputRef={detailImgRef_two}
              labelId="detailImage[1].detailImage"
              name="detailImage[1].detailImage"
              imgChang={setDetailImgTwo}
              details={false}
            />
          </div>
          <div className="w-full">
            <ImageLabel
              imgUrl={detailImgThree}
              inputRef={detailImgRef_three}
              labelId="detailImage[2].detailImage"
              name="detailImage[2].detailImage"
              imgChang={setDetailImgThree}
              details={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface IImageLabel {
  imgUrl: string;
  labelId: string;
  inputRef: RefObject<HTMLInputElement | null>;
  name: string;
  details: boolean;
  imgChang: Dispatch<SetStateAction<string>>;
}

function ImageLabel({
  imgUrl,
  labelId,
  inputRef,
  name,
  details,
  imgChang,
}: IImageLabel) {
  return (
    <div className="w-full h-full flex">
      {imgUrl ? (
        <div
          className={`relative w-full rounded-md overflow-hidden border-2 border-dashed border-(--mt-gray) ${
            details ? "h-96" : "h-40"
          }`}
          onClick={() => inputRef.current?.click()}
        >
          <Image src={imgUrl} alt="이미지 업로드" fill />
        </div>
      ) : (
        <label
          htmlFor={labelId}
          className={`border border-dashed p-3 rounded-md bg-(--mt-gray-light) text-(--mt-gray) flex flex-col items-center justify-center ${
            details ? "w-full h-96" : "w-full h-40"
          }`}
        >
          <PhotoIcon className="size-10" />
          <span className="text-sm">이미지 업로드</span>
        </label>
      )}
      <input
        id={labelId}
        ref={inputRef}
        name={name}
        type="file"
        accept="image/jpg, image/jpeg, image/png, image/webp, image/gif"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          imgChang((prev) => {
            if (prev) {
              URL.revokeObjectURL(prev);
            }
            return URL.createObjectURL(file);
          });
        }}
        hidden
      />
    </div>
  );
}
