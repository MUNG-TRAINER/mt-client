"use client";
import {IFirebaseMsgTypes} from "@/types/firebaseMsg/IFirebaseMsgTypes";
import {onMessage} from "firebase/messaging";
import {ReactNode, useEffect} from "react";

export default function FirebaseProvider({children}: {children: ReactNode}) {
  const requestNotification = () => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js", {scope: "/"}).then(
        (regist) => {
          console.log("서비스워커가 등록되었습니다. :: ", regist);
          regist.addEventListener("updatefound", () => {
            regist.update();
            console.log("서비스워커가 업데이트 되었습니다.");
          });
        },
        (err) => {
          console.log("서비스워커가 등록 실패했습니다. :: ", err);
        },
      );
    } else {
      console.error("서비스워커가 지원되지 않습니다.");
    }
  }, []);
  // useEffect(() => {
  //   // 알림 요청
  //   requestNotification();
  //   // 알림 허용 후
  //   if (Notification.permission === "granted") {
  //     const subscribe = onMessage(messaging, async (payload) => {
  //       const payLoadTitle = payload.notification?.title;
  //       const payLoadOption: NotificationOptions = {
  //         icon: payload.notification?.icon,
  //         body: payload.notification?.body,
  //         data: payload.data,
  //       };
  //       const noti = new Notification(payLoadTitle + "", payLoadOption);
  //       const data: IFirebaseMsgTypes = noti.data;

  //       noti.onclick = () => {
  //         window.open(`https://mungschool.kro.kr/${data.url}`);
  //       };
  //     });
  //     return () => subscribe();
  //   }
  // }, []);
  return <>{children}</>;
}
