import Image from "next/image";
import logo_slogun from "@/public/logos/logo_text_slogun_svg_white.svg";

export const metadata = {
  title: "멍선생 소개",
};

export default function IntroducePage() {
  return (
    <div className="bg-(--mt-white) rounded-md h-full p-6 flex flex-col items-center gap-6 overflow-y-scroll">
      <section className="flex size-72 justify-center bg-(--mt-blue) rounded-full">
        <Image src={logo_slogun} alt="멍선생 프로필" width={150} height={150} />
      </section>
      <h1 className="text-4xl font-bold text-center font-dohyeon">
        멍스쿨 소개
      </h1>
      <section className="space-y-2 text-lg">
        <p>
          안녕하세요! <strong>멍스쿨</strong>입니다. 반려견과 주인이 함께
          행복하게 지낼 수 있도록 훈련과 교육을 도와드리고 있습니다.
        </p>
        <p>
          다양한 훈련 경험과 검증된 교육 방법으로, 사회성 향상과 기본 복종
          훈련을 전문적으로 진행합니다.
        </p>
        <p>
          초보자부터 경험자까지 누구나 쉽게 따라올 수 있는 프로그램으로 반려견과
          함께 즐겁게 성장하세요!
        </p>
      </section>

      <section className="flex flex-col gap-2 w-full">
        <h2 className="text-2xl font-semibold">멍선생의 강점</h2>
        <ul className="flex flex-col gap-1">
          <li>회원제로 운영하는 훈련사와의 반려견 훈련 경험</li>
          <li>반려견과 주인 맞춤형 교육 프로그램 제공</li>
          <li>긍정 강화 기반의 보상 중심 훈련</li>
          <li>사회성 향상과 문제 행동 개선 전문</li>
        </ul>
      </section>

      <section className="bg-(--mt-blue-light) p-4 rounded-md text-center text-gray-800 w-full mt-auto">
        <p className="mb-2 font-semibold">상담 및 문의</p>
        <p>이메일: mungteacher@example.com</p>
      </section>
    </div>
  );
}
