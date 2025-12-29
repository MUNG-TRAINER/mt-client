export const runtime = "nodejs";
import {IFirebaseSendMsgTypes} from "@/types/firebaseMsg/IFirebaseMsgTypes";
import admin from "firebase-admin";
import {getMessaging, Message} from "firebase-admin/messaging";
import {NextRequest, NextResponse} from "next/server";

function getFirebaseApp() {
  if (admin.apps.length > 0) {
    return admin.apps[0];
  }
  if (
    !process.env.FIREBASE_ADMIN_PROJECTID ||
    !process.env.FIREBASE_ADMIN_CLIENTEMAIL ||
    !process.env.FIREBASE_ADMIN_PRIVATEKEY
  ) {
    throw new Error("Firebase Admin변수가 없습니다.");
  }
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECTID,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATEKEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_ADMIN_CLIENTEMAIL,
    }),
  });
  return admin;
}
// 런타임 환경변수 주입

export async function POST(req: NextRequest) {
  const admin = getFirebaseApp();
  const requestBody: IFirebaseSendMsgTypes = await req.json();
  try {
    const message: Message = {
      notification: {
        title: requestBody.title,
        body: requestBody.msgBody,
      },
      webpush: {
        headers: {Urgency: "high"},
        notification: {
          title: requestBody.title,
          body: requestBody.msgBody,
        },
      },
      data: {
        title: requestBody.title,
        desc: requestBody.desc,
        userId: requestBody.userId + "",
        url: requestBody.url,
      },
      token: requestBody.token,
    };
    const sendMsg = await admin?.messaging().send(message);
    if (!sendMsg) {
      return NextResponse.json({
        success: false,
        message: "메세지를 보내는데 실패했습니다.",
      });
    }
    return NextResponse.json({
      success: true,
      message: "메세지를 보내는데 성공했습니다.",
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error :: ", err.message);
    return NextResponse.json({
      success: false,
      message: "메세지를 보내는데 실패했습니다.",
    });
  }
}
