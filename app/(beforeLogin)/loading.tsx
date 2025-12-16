import Image from "next/image";
import logo_slogun from "@/public/logos/logo_text_slogun_svg_white.svg";

export default function BeforeLoginLoading() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 p-6 w-full sm:w-[404px] h-[700px] bg-(--mt-white) rounded-2xl m-auto overflow-x-hidden">
      <div className="relative size-56 bg-(--mt-blue) overflow-hidden rounded-full flex justify-center items-center animate-bounce">
        <Image src={logo_slogun} alt="로고이미지" width={120} />
      </div>
    </div>
  );
}
