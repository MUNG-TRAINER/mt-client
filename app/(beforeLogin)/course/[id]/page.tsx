import CourseDetailCard from "@/components/pages/beforeLogin/course/CourseDetailCard";
// 이 페이지에서는 trainer 데이터는 컴포넌트 훅에서 로드합니다.

export default async function Page({params}: {params: Promise<{id: string}>}) {
  const param = await params;
  return (
    <div>
      <CourseDetailCard courseId={param.id} />
    </div>
  );
}
