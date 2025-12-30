"use client";
import { fcmApi } from "@/apis/fcm/fcmApi";
import useIndexedDB from "@/hooks/indexedDB/useIndexedDB";
import { IFirebaseMsgTypes } from "@/types/firebaseMsg/IFirebaseMsgTypes";
import { app } from "@/util/firebase/initFirebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IFCMContextTypes {
  token: string | null;
  ready: boolean;
}
const FCMContext = createContext<IFCMContextTypes>({
  ready: false,
  token: null,
});
export const useFCM = () => useContext(FCMContext);

export default function FirebaseProvider({
  children,
}: {
  children: ReactNode;
}) {
  // states
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  // custom hook
  const { addNotification, editAlertState } = useIndexedDB();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js", { scope: "/" })
        .then(
          (regist) => {
            console.log("서비스워커가 등록되었습니다.");
            regist.addEventListener("updatefound", () => {
              regist.update();
              console.log("서비스워커가 업데이트 되었습니다.");
            });
          },
          (err) => {
            console.log("서비스워커가 등록 실패했습니다. :: ", err);
            // iOS에서는 Service Worker가 제한적으로 지원되므로 앱은 계속 작동
          },
        )
        .catch((error) => {
          console.log("서비스워커 등록 중 예외 발생:", error);
        });
    } else {
      console.log(
        "서비스워커가 지원되지 않는 환경입니다. (일반 브라우저 모드)",
      );
    }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;

    let msgUnSubscribe: (() => void) | undefined;
    const init = async () => {
      try {
        // Notification API가 지원되지 않는 환경 체크
        if (!("Notification" in window)) {
          console.log("이 브라우저는 알림을 지원하지 않습니다.");
          setReady(true); // 알림 없이도 앱은 작동
          return;
        }

        // permission 체크
        if (Notification.permission === "denied") {
          setReady(true); // 알림 거부되어도 앱은 작동
          return;
        }

        const notification = await Notification.requestPermission();
        const messaging = getMessaging(app);
        if (notification === "granted") {
          const fcmToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });
          setToken(fcmToken);

          setReady(true);
          msgUnSubscribe = onMessage(messaging, (payload) => {
            console.log("foreground :: ", payload);
            const payLoadTitle = payload.notification?.title;
            const payLoadOption: NotificationOptions = {
              icon: payload.notification?.icon,
              body: payload.notification?.body,
              data: payload.data,
            };
            const noti = new Notification(payLoadTitle + "", payLoadOption);
            const data: IFirebaseMsgTypes = noti.data;
            // 여기에 db에 noti저장하는 함수 만들 수 있음
            addNotification({ ver: 1, data });
            editAlertState(true);
            const origin = self.location?.origin ?? window.location.origin;
            const path = data.url ? data.url : "";
            noti.onclick = () => {
              window.open(`${origin}/${path}`);
            };
          });
        } else {
          setReady(true); // 알림 거부되어도 앱은 작동
        }
      } catch (error) {
        console.error("Firebase 초기화 중 에러:", error);
        setReady(true); // 에러가 발생해도 앱은 작동
      }
    };
    init();
    return () => {
      if (msgUnSubscribe) msgUnSubscribe();
    };
  }, [addNotification, editAlertState]);

  useEffect(() => {
    if (!token) return;
    const updateFcmToken = async () => {
      await fcmApi.updateFcmToken(token);
    };
    updateFcmToken();
  }, [token]);

  const value = useMemo(() => ({ token, ready }), [token, ready]);
  return <FCMContext.Provider value={value}>{children}</FCMContext.Provider>;
}
