import {IFirebaseMsgTypes} from "@/types/firebaseMsg/IFirebaseMsgTypes";

export interface INotiData extends IFirebaseMsgTypes {
  id: number;
}
export interface IAlertTypes {
  id: number;
  state: boolean;
}
export const INDEXED_DB_NAME = "notice-center";
export const ALERT = "alert";
export const NOTIFICATION = "notification";

// initailized DB
export const initDB = (ver: number): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const dbOpen = indexedDB.open(INDEXED_DB_NAME, ver);
    // indexed db 연결 성공
    dbOpen.addEventListener("success", () => {
      const db: IDBDatabase = dbOpen.result;
      resolve(db);
    });
    // index db 업그레이드 시 자동 업데이트
    dbOpen.addEventListener("upgradeneeded", () => {
      const db = dbOpen.result;
      const dbs =
        db.objectStoreNames.contains(ALERT) &&
        db.objectStoreNames.contains(NOTIFICATION);
      if (!dbs) {
        db.createObjectStore(ALERT, {
          keyPath: "id",
          autoIncrement: true,
        });
        db.createObjectStore(NOTIFICATION, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    });
    dbOpen.addEventListener("blocked", () => {
      reject(
        new Error("다른 탭에서 DB를 사용 중이라 업그레이드가 대기중입니다."),
      );
    });
    // indexed db 연결 실패
    dbOpen.addEventListener("error", () => {
      reject(new Error("DB로딩에 실패했습니다."));
    });
  });
};
