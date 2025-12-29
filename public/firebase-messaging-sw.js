importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);

const INDEXED_DB_NAME = "notice-center";
const ALERT = "alert";
const NOTIFICATION = "notification";

let cachedDB = null;

firebase.initializeApp({
  apiKey: "AIzaSyAtqbsz5KHfSI5FpLfZa98pGqFOCBlg9aE",
  projectId: "project1-bb5e2",
  messagingSenderId: "729098212038",
  appId: "1:729098212038:web:e24b600bb98334d111bdc7",
});

const messaging = firebase.messaging();
// 백그라운드 메세지
messaging.onBackgroundMessage((payload) => {
  const task = (async () => {
    const notificationTitle = payload.notification?.title;
    const notificationOptions = {
      body: payload.notification?.body,
      icon: payload.notification?.icon,
      data: payload.data,
    };
    await addNotification({
      ver: 1,
      data: {
        userId: payload.data.userId,
        title: payload.notification.title,
        desc: payload.notification.body,
        url: payload.data.url,
      },
    });
    await editAlertState(true);
    self.registration.showNotification(notificationTitle, notificationOptions);
  })();

  self.registration.waitUntil(task);
});
// 백그라운드 노티 클릭
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "/";
  const promise = (async () => {
    const clientList = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });
    for (const client of clientList) {
      if (client.url.startsWith(self.location.origin)) {
        await client.focus();
        await client.navigate(url);
        return;
      }
    }
    await self.clients.openWindow(url);
  })();
  event.waitUntil(promise);
});
// open Indexed DB
const initDB = (ver) => {
  if (cachedDB) return Promise.resolve(cachedDB);
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(INDEXED_DB_NAME, ver);
    request.onsuccess = () => {
      cachedDB = request.result;
      resolve(cachedDB);
    };
    request.onerror = () =>
      reject(
        new Error("Background indexedDB을 실행하는데 오류가 발생했습니다."),
      );
    request.onupgradeneeded = () => {
      const db = request.result;
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
    };
    request.onblocked = () =>
      reject(
        new Error("다른 탭에서 DB를 사용 중이라 업그레이드가 대기중입니다."),
      );
  });
};
// 알람 데이터 추가
const addNotification = async ({ver, data}) => {
  const db = await initDB(ver);
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(NOTIFICATION, "readwrite");
    const store = transaction.objectStore(NOTIFICATION);
    const request = store.add(data);
    request.onsuccess = async () => resolve();
    request.onerror = async () => {
      reject(new Error("알람 데이터를 추가하는데 실패했습니다."));
    };
  });
  const getNotiAll = await getNoticeDB(1);
  if (getNotiAll.length > 15) {
    await removeNotiData(1, getNotiAll[0].id);
  }
};

const getNoticeDB = async (ver) => {
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

const removeNotiData = async (ver, id) => {
  const db = await initDB(ver);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(NOTIFICATION, "readwrite");
    const store = transaction.objectStore(NOTIFICATION);
    store.delete(id);
    transaction.onsuccess = async () => resolve();
    transaction.onerror = () => {
      reject(new Error("Notice 데이터를 삭제하는데 실패했습니다."));
    };
  });
};

const editAlertState = async (state) => {
  const db = await initDB(1);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ALERT, "readwrite");
    const store = transaction.objectStore(ALERT);
    const request = store.get(1);
    request.onerror = () =>
      reject(new Error("Alert 데이터를 조회하지 못했습니다."));
    request.onsuccess = () => {
      const record = request.result;
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
