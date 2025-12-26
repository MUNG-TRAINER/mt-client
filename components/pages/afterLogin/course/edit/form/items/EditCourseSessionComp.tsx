import EditSessionItems from "./EditSessionItems";
import {ISessionType} from "@/types/course/sessionType";

export default function EditCourseSessionComp({
  session,
}: {
  session: ISessionType[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {session.map((val, index, array) => (
        <EditSessionItems
          key={Number(val.sessionNo)}
          val={val}
          index={index}
          list={array}
        />
      ))}
    </div>
  );
}
