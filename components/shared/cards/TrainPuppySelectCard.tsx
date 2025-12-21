"use client";
import Image from "next/image";
import {Dispatch, SetStateAction, useState} from "react";
import CounselBadge from "../badges/CounselBadge";
import {CheckIcon} from "@/components/icons/check";

interface ITrainPuppySelectCardProps {
  puppyImgUrl?: string;
  puppyName: string;
  selectState: boolean;
  selectFn: Dispatch<SetStateAction<boolean>>;
  counselState: boolean;
}
export default function TrainPuppySelectCard({
  puppyImgUrl,
  puppyName,
  selectState,
  selectFn,
  counselState,
}: ITrainPuppySelectCardProps) {
  const [randomInt] = useState(() => Math.floor(Math.random() * 10));
  const bgClass = [
    "bg-red-200",
    "bg-orange-200",
    "bg-yellow-200",
    "bg-lime-200",
    "bg-green-200",
    "bg-teal-200",
    "bg-blue-200",
    "bg-sky-200",
    "bg-indigo-200",
    "bg-pink-200",
  ];
  return (
    <article className="p-3 bg-(--mt-gray-light) rounded-2xl flex gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <div className="overflow-hidden size-10 rounded-full relative">
            {puppyImgUrl ? (
              <Image
                src={puppyImgUrl}
                alt={puppyName}
                width={500}
                height={500}
              />
            ) : (
              <div className={`${bgClass[randomInt]} size-10 rounded-full`} />
            )}
          </div>
          <h3 className="text-2xl font-bold">{puppyName}</h3>
        </div>
        <CounselBadge counselState={counselState} />
      </div>
      {selectState ? (
        <button
          className="size-8 rounded-full bg-blue-500 flex justify-center items-center"
          onClick={() => selectFn}
        >
          <i className="text-(--mt-white)">
            <CheckIcon className="size-7" />
          </i>
        </button>
      ) : (
        <button
          className="size-8 rounded-full border-2 border-(--mt-gray-point)"
          onClick={() => selectFn}
        >
          <i className="text-(--mt-gray)">
            <CheckIcon className="size-7" />
          </i>
        </button>
      )}
    </article>
  );
}
