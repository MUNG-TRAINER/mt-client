"use client";
import {TrashIcon} from "@/components/icons/trash";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import useIndexedDB from "@/hooks/indexedDB/useIndexedDB";
import {INotiData} from "@/util/indexedDB/initDB";
import {NOTI_BROADCAST} from "@/util/variables";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function HeaderAlert({state}: {state: boolean}) {
  const {data} = useCheckLoggedIn();
  const [noti, setNoti] = useState<INotiData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {getNoticeDB, removeNotiData} = useIndexedDB();
  const myUserId = data && "userId" in data ? Number(data.userId) : null;
  const handleDeleteItem = (id: number) => {
    removeNotiData(1, id);
    setNoti((prev) => {
      if (!prev) {
        return [];
      }
      return prev?.filter((val) => val.id !== id);
    });
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const db = await getNoticeDB(1);
      const myData = db.filter(
        (val) => myUserId !== null && Number(val.userId) === myUserId,
      );
      setNoti(myData);
      setLoading(false);
    };
    getData();
  }, [getNoticeDB, myUserId]);
  useEffect(() => {
    const notiBroadCast = new BroadcastChannel(NOTI_BROADCAST);

    notiBroadCast.onmessage = async (e) => {
      const db = await getNoticeDB(1);
      if (e.data.alert) {
        const myData = db.filter(
          (val) => myUserId !== null && Number(val.userId) === myUserId,
        );
        setNoti(myData);
      }
    };

    return () => notiBroadCast.close();
  }, [getNoticeDB, myUserId]);
  return (
    <div
      className={`absolute w-70 ${state ? "h-80 scale-y-full" : "h-0 scale-y-0"} top-20 right-4 z-70 rounded-b-lg transition-transform duration-200 ease-in-out origin-top shadow-2xl`}
    >
      <ul className="bg-(--mt-white) w-full h-full rounded-md p-2 flex flex-col gap-2 *:bg-blue-100 *:p-2 *:rounded-md overflow-y-auto">
        {loading && <p>알림 데이터 가져오는 중..</p>}
        {noti && noti.length < 1 ? (
          <p>알림이 없습니다..</p>
        ) : (
          noti?.map((val) => (
            <li key={val.id} className="flex items-center justify-between">
              <Link
                href={val.url}
                className="font-bold truncate hover:bg-(--mt-blue-smoke) p-2 rounded-md flex-1"
              >
                {val.title}
              </Link>
              <button
                className="size-8 rounded-full p-1 hover:bg-(--mt-blue-smoke)"
                onClick={() => handleDeleteItem(val.id)}
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
