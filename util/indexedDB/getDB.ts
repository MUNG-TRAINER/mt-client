import {ALERT, initDB, INotiData, NOTIFICATION} from "./initDB";

export const getNoticeDB = async (ver: number): Promise<INotiData[]> => {
  const db = await initDB(ver);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(NOTIFICATION, "readonly");
    const store = transaction.objectStore(NOTIFICATION);
    const data = store.getAll();
    data.onsuccess = () => {
      resolve(data.result);
    };
    data.onerror = () => {
      reject(new Error("Notice 데이터를 불러오는데 실패했습니다."));
    };
  });
};

export const getAlertDB = async (ver: number) => {
  const db = await initDB(ver);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ALERT, "readonly");
    const store = transaction.objectStore(ALERT);
    const data = store.get(1);
    data.onsuccess = () => {
      resolve(data.result);
    };
    data.onerror = () => {
      reject(new Error("Notice 데이터를 불러오는데 실패했습니다."));
    };
  });
};
