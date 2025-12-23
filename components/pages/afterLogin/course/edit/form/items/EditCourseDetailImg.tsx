"use client";
import {PencilIcon} from "@/components/icons/pencil";
import {PhotoIcon} from "@/components/icons/photo";
import CourseLabelBox from "@/components/pages/afterLogin/course/create/formDataComps/common/CourseLabelBox";
import {handleChangeImg} from "@/util/imgURLstate";
import Image from "next/image";
import {useRef, useState} from "react";

interface IEditCourseDetailImg {
  detailImg1: string | undefined;
  detailImg2: string | undefined;
  detailImg3: string | undefined;
}
export default function EditCourseDetailImg({
  detailImg1,
  detailImg2,
  detailImg3,
}: IEditCourseDetailImg) {
  const [newDetailImageOne, setDetailImageOne] = useState("");
  const [newDetailImageTwo, setDetailImageTwo] = useState("");
  const [newDetailImageThree, setDetailImageThree] = useState("");
  const detailImageOne = useRef<HTMLInputElement | null>(null);
  const detailImageTwo = useRef<HTMLInputElement | null>(null);
  const detailImageThree = useRef<HTMLInputElement | null>(null);
  return (
    <CourseLabelBox classNames="my-3">
      <label htmlFor="">세부이미지</label>
      <ul className="flex justify-between gap-3">
        <li>
          {detailImg1 ? (
            <div
              className="relative size-32"
              onClick={() => detailImageOne.current?.click()}
            >
              <Image src={detailImg1 + ""} alt="세부이미지_1" fill />
            </div>
          ) : (
            <div
              className="relative size-32  border border-dashed border-(--mt-gray-point) flex items-center justify-center"
              onClick={() => detailImageOne.current?.click()}
            >
              {newDetailImageOne ? (
                <EditDetailImages
                  src={newDetailImageOne}
                  alt="변경할 세부이미지_1"
                />
              ) : (
                <PhotoIcon className="text-(--mt-gray) size-20" />
              )}
            </div>
          )}
          <input
            id="detailImage[0]"
            ref={detailImageOne}
            type="file"
            name="detailImage[0].detailImage"
            onChange={(e) => handleChangeImg(e, setDetailImageOne)}
            hidden
          />
        </li>
        <li>
          {detailImg2 ? (
            <div
              className="relative size-32"
              onClick={() => detailImageTwo.current?.click()}
            >
              <Image src={detailImg2 + ""} alt="세부이미지_2" fill />
            </div>
          ) : (
            <div
              className="relative size-32  border border-dashed border-(--mt-gray-point) flex items-center justify-center"
              onClick={() => detailImageTwo.current?.click()}
            >
              {newDetailImageTwo ? (
                <EditDetailImages
                  src={newDetailImageTwo}
                  alt="변경할 세부이미지_2"
                />
              ) : (
                <PhotoIcon className="text-(--mt-gray) size-20" />
              )}
            </div>
          )}

          <input
            id="detailImage[1]"
            ref={detailImageTwo}
            type="file"
            name="detailImage[1].detailImage"
            onChange={(e) => handleChangeImg(e, setDetailImageTwo)}
            hidden
          />
        </li>
        <li>
          {detailImg3 ? (
            <div
              className="relative size-32"
              onClick={() => detailImageThree.current?.click()}
            >
              <Image src={detailImg3 + ""} alt="세부이미지_3" fill />
            </div>
          ) : (
            <div
              className="relative size-32  border border-dashed border-(--mt-gray-point) flex items-center justify-center"
              onClick={() => detailImageThree.current?.click()}
            >
              {newDetailImageThree ? (
                <EditDetailImages
                  src={newDetailImageThree}
                  alt="변경할 세부이미지_3"
                />
              ) : (
                <PhotoIcon className="text-(--mt-gray) size-20" />
              )}
            </div>
          )}
          <input
            id="detailImage[2]"
            ref={detailImageThree}
            type="file"
            name="detailImage[2].detailImage"
            onChange={(e) => handleChangeImg(e, setDetailImageThree)}
            hidden
          />
        </li>
      </ul>
    </CourseLabelBox>
  );
}

function EditDetailImages({src, alt}: {src: string; alt: string}) {
  return (
    <>
      <button className="size-5 rounded-full text-(--mt-white) bg-red-500 absolute bottom-2 right-2 flex items-center justify-center">
        <PencilIcon className="size-3" />
      </button>
      <Image src={src} alt={alt} fill />
    </>
  );
}
