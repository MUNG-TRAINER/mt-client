export default function DogDeleteConfirm({ name }: { name: string }) {
  return (
    <>
      정말로 <span className="font-bold text-(--mt-black)">{name}</span>의
      정보를 삭제하시겠습니까?
      <br />
      <br />
      삭제하려면 반려견 이름{" "}
      <span className="font-bold text-(--mt-black)">{name}</span>을(를)
      입력해주세요.
    </>
  );
}
