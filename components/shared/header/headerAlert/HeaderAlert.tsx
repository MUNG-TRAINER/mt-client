"use clinet";
import {TrashIcon} from "@/components/icons/trash";
import useIndexedDB from "@/hooks/indexedDB/useIndexedDB";
import {INotiData} from "@/util/indexedDB/initDB";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function HeaderAlert({state}: {state: boolean}) {
  const [noti, setNoti] = useState<INotiData[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const {getNoticeDB, removeNotiData} = useIndexedDB();
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const db = await getNoticeDB(1);
      setNoti(db);
      setLoading(false);
    };
    getData();
  }, [getNoticeDB]);
  return (
    <div
      className={`absolute w-70 ${state ? "h-80 scale-y-full" : "h-0 scale-y-0"}  top-18.75 right-4 z-70 bg-(--mt-blue) p-3 rounded-b-lg transition-transform duration-200 ease-in-out origin-top`}
    >
      <ul className="bg-(--mt-white) w-full h-full rounded-md p-2 flex flex-col gap-2 *:bg-blue-100 *:p-2 *:rounded-md overflow-y-auto">
        {loading && <p>알림 데이터 가져오는 중..</p>}
        {!noti ? (
          <p>알림이 없습니다..</p>
        ) : (
          noti?.map((val) => (
            <li key={val.id} className="flex items-center justify-between">
              <Link
                href={val.url}
                className="text-xl font-bold truncate hover:bg-(--mt-blue-smoke) p-2 rounded-md flex-1"
              >
                {val.title}
              </Link>
              <button
                className="size-8 rounded-full p-1 hover:bg-(--mt-blue-smoke)"
                onClick={() => removeNotiData(1, val.id)}
              >
                <TrashIcon />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
