import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center m-auto">
      <h2 className="font-dohyeon text-2xl font-semibold">
        잘못된 접근이예요.
      </h2>
      <Link
        href={"/"}
        className="text-sm font-bold text-(--mt-blue) hover:text-(--mt-blue-point)"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
