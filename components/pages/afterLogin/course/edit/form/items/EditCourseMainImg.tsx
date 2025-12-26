"use client";
import {PencilIcon} from "@/components/icons/pencil";
import CourseLabelBox from "@/components/pages/afterLogin/course/create/formDataComps/common/CourseLabelBox";
import {handleChangeImg} from "@/util/imgURLstate";
import Image from "next/image";
import {useRef, useState} from "react";

export default function EditCourseMainImg({img}: {img: string}) {
  const [newImage, setImage] = useState("");
  const mainImageRef = useRef<HTMLInputElement | null>(null);
  return (
    <CourseLabelBox classNames="relative">
      <label
        htmlFor="mainImage"
        className="before:content-['*'] before:text-sm before:text-red-500 before:mr-1"
      >
        메인이미지
      </label>
      <div
        className="relative w-full h-64"
        onClick={() => mainImageRef.current?.click()}
      >
        {newImage ? (
          <Image src={newImage} alt="새메인이미지" fill />
        ) : (
          <Image src={img} alt="메인이미지" fill />
        )}
      </div>
      <input
        ref={mainImageRef}
        id="mainImage"
        type="file"
        name="mainImage"
        onChange={(e) => handleChangeImg(e, setImage)}
        hidden
      />
      <button className="size-8 rounded-full text-(--mt-white) bg-red-500 absolute bottom-2 right-2 flex items-center justify-center">
        <PencilIcon className="size-5" />
      </button>
    </CourseLabelBox>
  );
}
