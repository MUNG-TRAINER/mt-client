import { Metadata } from "next";
import CourseSearchClient from "@/components/pages/afterLogin/course/search/CourseSearchClient";

export const metadata: Metadata = {
  title: "훈련 과정 검색",
  description: "반려견 훈련 과정을 검색하고 예약하세요",
};

export default function CourseSearchPage() {
  return <CourseSearchClient />;
}
