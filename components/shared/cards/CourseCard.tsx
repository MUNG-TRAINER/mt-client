"use client";

import React from "react";
import Image from "next/image";

interface ApplicationInfoProps {
  title: string;
  description: string;
  tags?: string[];
  mainImage?: string;
  location?: string;
  sessionSchedule?: string;
}

const tagStyleMap = [
  {bg: "#E7F5FF", text: "#4263EB"},
  {bg: "#FFF3BF", text: "#F59F00"},
  {bg: "#E5DBFF", text: "#7950F2"},
];

const CourseCard: React.FC<ApplicationInfoProps> = ({
  title,
  description,
  tags = [],
  mainImage,
  location,
  sessionSchedule,
}) => {
  const formatSchedule = (schedule?: string) => {
    if (!schedule) return "";
    const [start, end] = schedule.split(" ~ ");
    const formatTime = (datetime: string) => {
      if (!datetime) return "";
      const [date, time] = datetime.split(" ");
      if (!time) return date;
      const [hh, mm] = time.split(":");
      return `${date} ${hh}:${mm}`;
    };
    return `${formatTime(start)} ~ ${formatTime(end)}`;
  };

  return (
    <div>
      <div className="flex gap-4 pb-2">
        <div className="relative w-24 h-24 sm:w-40 sm:h-40 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={
              mainImage &&
              (mainImage.startsWith("http") || mainImage.startsWith("/"))
                ? mainImage
                : "/images/application/test.jpg"
            }
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 pr-10">
          <h2 className="text-[16px] font-semibold mb-1">{title}</h2>
          <p className="text-xs text-gray-500 mb-2">{description}</p>

          <div className="flex gap-1 flex-wrap mb-2">
            {tags.map((tag, idx) => {
              const style = tagStyleMap[idx % tagStyleMap.length];
              return (
                <span
                  key={`${tag}-${idx}`}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{backgroundColor: style.bg, color: style.text}}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {location && (
        <div className="flex mb-2 text-xs gap-4">
          <div className="flex items-center justify-center gap-2 p-1 text-gray-400">
            <Image
              src="/images/application/location.jpg"
              alt="장소"
              width={18}
              height={18}
            />
            {location}
          </div>
          <p className="text-xs text-gray-400 mb-1 flex gap-1 items-center">
            <Image
              src="/images/application/calendar.jpg"
              alt="달력"
              width={13}
              height={5}
              className="w-[14px] h-[15px] items-center"
            />
            {formatSchedule(sessionSchedule)}
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
