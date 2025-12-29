import {NextResponse} from "next/server";

export async function GET() {
  const key = process.env.FIREBASE_VAPIDKEY;
  if (!key) {
    return NextResponse.json({
      succuss: false,
      message: "키값을 불러오지 못했습니다.",
    });
  }
  return NextResponse.json(key);
}
