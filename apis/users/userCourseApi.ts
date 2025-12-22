import {UserCourseType} from "@/types/course/userCourse";

export const userCourseApi = {
  getCoursesByStatus: async (status: "SCHEDULED" | "DONE") => {
    const res = await fetch(`/api/users/course?status=${status}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
        console.error(await res.text()); 
      throw new Error("훈련과정 내역을 불러오는데 실패했습니다.");
    }

    return (await res.json()) as UserCourseType[];
  },
};
