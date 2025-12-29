import {IFirebaseMsgTypes} from "@/types/firebaseMsg/IFirebaseMsgTypes";
import {getNoticeDB} from "./getDB";
import {initDB, INotiData, NOTIFICATION} from "./initDB";
import {removeNotiData} from "./removeDB";

// 알람 데이터 추가
export const addNotification = async ({
  ver,
  data,
}: {
  ver: number;
  data: IFirebaseMsgTypes;
}) => {
  const db = await initDB(ver);
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(NOTIFICATION, "readwrite");
    const store = transaction.objectStore(NOTIFICATION);
    const request = store.add(data);
    request.onsuccess = async () => resolve(request.result);
    request.onerror = async () => {
      reject(new Error("알람 데이터를 추가하는데 실패했습니다."));
    };
  });
  const getNotiAll: INotiData[] = await getNoticeDB(1);
  if (getNotiAll.length > 15) {
    await removeNotiData(1, getNotiAll[0].id);
  }
};
