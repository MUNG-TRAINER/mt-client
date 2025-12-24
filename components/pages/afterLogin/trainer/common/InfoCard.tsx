interface InfoCardProps {
  label: string;
  value: string;
}

export function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="border border-(--mt-gray-light) p-3 rounded-md">
      <span className="text-xs text-(--mt-gray) block mb-1">{label}</span>
      <span className="text-sm font-semibold text-(--mt-black)">{value}</span>
    </div>
  );
}
