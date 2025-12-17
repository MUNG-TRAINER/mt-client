import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import CreateCourseInput from "../CreateCourseInput";
import {PhotoIcon} from "@/components/icons/photo";

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
          inputRef={mainImageRef}
          labelId="mainImageRef"
          name="mainImageRef"
          imgChang={setMainImg}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold">세부 이미지 업로드 (여러 장 첨부 가능)</h3>
        <div className="flex items-center justify-between">
          <div>
            <ImageLabel
              inputRef={detailImgRef_one}
              labelId="detailImage[0].detailImage"
              name="detailImage[0].detailImage"
              imgChang={setDetailImgOne}
            />
          </div>
          <div>
            <ImageLabel
              inputRef={detailImgRef_two}
              labelId="detailImage[1].detailImage"
              name="detailImage[1].detailImage"
              imgChang={setDetailImgTwo}
            />
          </div>
          <div>
            <ImageLabel
              inputRef={detailImgRef_three}
              labelId="detailImage[2].detailImage"
              name="detailImage[2].detailImage"
              imgChang={setDetailImgThree}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface IImageLabel {
  labelId: string;
  inputRef: RefObject<HTMLInputElement | null>;
  name: string;
  imgChang: Dispatch<SetStateAction<string>>;
}

function ImageLabel({labelId, inputRef, name, imgChang}: IImageLabel) {
  return (
    <div className="w-full h-full flex">
      <label
        htmlFor={labelId}
        className="border border-dashed w-full h-full p-3 rounded-md bg-(--mt-gray-light) text-(--mt-gray) flex flex-col items-center"
      >
        <PhotoIcon className="size-10" />
        <span className="text-sm">이미지 업로드</span>
      </label>
      <CreateCourseInput
        id={labelId}
        inputRef={inputRef}
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
