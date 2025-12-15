"use client";

import CreateCourseCard from "./CreateCourseCard";

export default function CreateCourse() {
  return (
    <form>
      <fieldset>
        <legend>훈련과정업로드</legend>
        <CreateCourseCard>
          <h6 className="font-bold">수업 형태</h6>
          <div className="flex justify-around *:flex *:gap-2">
            <div>
              <label htmlFor="type_once">일회성 수업</label>
              <input id="type_once" name="type" type="radio" defaultChecked />
            </div>
            <div>
              <label htmlFor="type_multi">다회성 수업</label>
              <input id="type_multi" name="type" type="radio" />
            </div>
          </div>
          <p className="p-2 text-(--mt-blue) bg-(--mt-blue-light) rounded-md">
            회차형 수업은 전체 회차 중 50% 이상 이수한 반려견만 중간 참여 가능
          </p>
        </CreateCourseCard>
      </fieldset>
    </form>
  );
}
