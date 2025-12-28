interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusMap: Record<string, { label: string; className: string }> = {
    SUCCESS: {
      label: "결제완료",
      className:
        "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200",
    },
    PENDING: {
      label: "대기중",
      className:
        "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-200",
    },
    CANCELED: {
      label: "취소됨",
      className:
        "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border border-rose-200",
    },
    FAILED: {
      label: "실패",
      className:
        "bg-gradient-to-r from-slate-50 to-gray-50 text-slate-600 border border-slate-200",
    },
  };

  const statusInfo = statusMap[status] || {
    label: status,
    className:
      "bg-gradient-to-r from-slate-50 to-gray-50 text-slate-600 border border-slate-200",
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full font-bold text-xs whitespace-nowrap ${statusInfo.className}`}
    >
      {statusInfo.label}
    </span>
  );
}
