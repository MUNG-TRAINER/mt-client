interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

export function StatCard({
  label,
  value,
  icon,
  highlight = false,
}: StatCardProps) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        highlight
          ? "bg-gradient-to-br from-(--mt-blue-point) to-blue-600 text-white"
          : "bg-gray-50 border border-(--mt-gray-light)"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <p
          className={`text-xs font-semibold ${
            highlight ? "text-blue-100" : "text-(--mt-gray)"
          }`}
        >
          {label}
        </p>
        <div
          className={`${highlight ? "text-white" : "text-(--mt-blue-point)"}`}
        >
          {icon}
        </div>
      </div>
      <p
        className={`text-2xl font-bold ${
          highlight ? "text-white" : "text-(--mt-black)"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
