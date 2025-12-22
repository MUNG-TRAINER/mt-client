"use client";
import CourseLabelBox from "@/components/pages/afterLogin/course/create/formDataComps/common/CourseLabelBox";
import {handleChangeImg} from "@/util/imgURLstate";
import Image from "next/image";
import {useRef, useState} from "react";

export default function EditCourseMainImg({img}: {img: string}) {
  const [newImage, setImage] = useState("");
  const mainImageRef = useRef<HTMLInputElement | null>(null);
  return (
    <CourseLabelBox>
      <label htmlFor="mainImage">메인이미지</label>
      <div
        className="relative w-full h-64"
        onClick={() => mainImageRef.current?.click()}
      >
        {newImage ? (
          <Image src={newImage} alt="메인이미지" fill />
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
    </CourseLabelBox>
  );
}
