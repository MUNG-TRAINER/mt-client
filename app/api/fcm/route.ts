import {credential, initializeApp} from "firebase-admin";
import {getApps} from "firebase-admin/app";
import {getMessaging, Message} from "firebase-admin/messaging";
import {NextRequest, NextResponse} from "next/server";

// 런타임 환경변수 주입
const app =
  getApps().length === 0
    ? initializeApp({
        credential: credential.cert({
          projectId: process.env.FIREBAE_ADMIN_PROJECTID,
          privateKey: process.env.FIREBAE_ADMIN_PRIVATEKEY?.replace(
            /\\n/g,
            "\n",
          ),
          clientEmail: process.env.FIREBAE_ADMIN_CLIENTEMAIL,
        }),
      })
    : getApps()[0];

export async function POST(req: NextRequest) {
  const requestBody = await req.json();

  const message: Message = {
    //작업중..
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
