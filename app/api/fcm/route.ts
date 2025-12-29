export const runtime = "nodejs";
import {IFirebaseSendMsgTypes} from "@/types/firebaseMsg/IFirebaseMsgTypes";
import {credential, initializeApp} from "firebase-admin";
import {getApps} from "firebase-admin/app";
import {getMessaging, Message} from "firebase-admin/messaging";
import {NextRequest, NextResponse} from "next/server";

function getFirebaseApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }
  return initializeApp({
    credential: credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECTID,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATEKEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_ADMIN_CLIENTEMAIL,
    }),
  });
}
// 런타임 환경변수 주입

export async function POST(req: NextRequest) {
  const app = getFirebaseApp();
  const requestBody: IFirebaseSendMsgTypes = await req.json();

  const message: Message = {
    notification: {
      title: requestBody.title,
      body: requestBody.msgBody,
    },
    webpush: {
      notification: {
        title: requestBody.title,
        body: requestBody.msgBody,
        icon: "./favicon.png",
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
  const sendMsg = await getMessaging(app).send(message);

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
}
