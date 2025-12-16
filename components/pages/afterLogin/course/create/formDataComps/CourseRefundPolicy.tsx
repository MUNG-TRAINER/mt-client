export default function CourseRefundPolicy() {
  return (
    <>
      <label htmlFor="refundPolicy">환불 정책</label>
      <textarea
        id="refundPolicy"
        name="refundPolicy"
        className="border border-(--mt-gray) bg-(--mt-gray-light) p-3 rounded-md resize-none"
        rows={5}
        placeholder="환불 정책을 작성해주세요."
      />
    </>
  );
}
