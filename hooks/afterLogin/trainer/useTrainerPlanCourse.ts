import {useEffect, useMemo, useState} from "react";
import {TrainerCourseType} from "@/types/trainer/trainerCourseType";
import {trainerCourseAPI} from "@/apis/trainer/trainerCourseApi";

export const useTrainerPlanCourses = (enabled: boolean) => {
  const [allCourses, setAllCourses] = useState<TrainerCourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"scheduled" | "completed">(
    "scheduled"
  );

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      trainerCourseAPI.getTrainerCoursesByStatus("SCHEDULED"),
      trainerCourseAPI.getTrainerCoursesByStatus("DONE"),
    ])
      .then(([scheduled, done]) => {
        const merged = [...scheduled, ...done];
        const grouped: TrainerCourseType[] = Object.values(
          merged.reduce((acc, cur) => {
            if (!acc[cur.courseId]) {
              acc[cur.courseId] = {
                courseId: cur.courseId,
                trainerId: cur.trainerId,
                title: cur.title,
                type: cur.type,
                lessonForm: cur.lessonForm,
                mainImage: cur.mainImage,
                location: cur.location,
                tags: cur.tags,
                description: cur.description,
                sessions: [],
              };
            }
            acc[cur.courseId].sessions.push({
              sessionId: cur.sessionId,
              sessionNo: cur.sessionNo,
              sessionDate: cur.sessionDate,
              startTime: cur.startTime,
              endTime: cur.endTime,
              sessionStatus: cur.sessionStatus,
            });

            return acc;
          }, {} as Record<number, TrainerCourseType>)
        );
        setAllCourses(grouped);
      })
      .catch(() => {
        throw new Error("훈련과정 내역을 불러오는 데 실패했습니다.");
      })
      .finally(() => setLoading(false));
  }, [enabled]);

  const courses = useMemo(() => {
    const status = activeTab === "scheduled" ? "SCHEDULED" : "DONE";
    return allCourses
      .map((course) => ({
        ...course,
        sessions: course.sessions.filter((s) => s.sessionStatus === status),
      }))
      .filter((course) => course.sessions.length > 0);
  }, [allCourses, activeTab]);

  return {
    loading,
    allCourses,
    courses,
    activeTab,
    setActiveTab,
  };
};
