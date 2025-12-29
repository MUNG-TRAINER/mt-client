import {initDB, NOTIFICATION} from "./initDB";

export const removeNotiData = async (
  ver: number,
  id: number,
): Promise<boolean> => {
  const db = await initDB(ver);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(NOTIFICATION, "readwrite");
    const store = transaction.objectStore(NOTIFICATION);
    const request = store.delete(id);
    request.onsuccess = async () => resolve(true);
    request.onerror = () => {
      reject(new Error("Notice 데이터를 삭제하는데 실패했습니다."));
    };
  });
};
