import {ALERT, IAlertTypes, initDB} from "./initDB";

export const editAlertState = async (state: boolean): Promise<void> => {
  const db = await initDB(1);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ALERT, "readwrite");
    const store = transaction.objectStore(ALERT);
    const request = store.get(1);
    request.onerror = () =>
      reject(new Error("Alert 데이터를 조회하지 못했습니다."));
    request.onsuccess = () => {
      const record: IAlertTypes = request.result;
      if (!record) {
        store.add({id: 1, state});
        return;
      }
      record.state = state;
      const update = store.put(record);
      update.onerror = () =>
        reject(new Error("Alert 데이터를 업데이트하지 못했습니다."));
    };
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(new Error("Alert 트렌젝션 실패."));
  });
};
