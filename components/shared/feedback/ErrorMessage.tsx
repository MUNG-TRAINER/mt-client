interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  className = "",
}: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className={`p-3 bg-red-50 border border-red-200 rounded-xl ${className}`}
      role="alert"
    >
      <p className="text-red-600 text-sm">{message}</p>
    </div>
  );
}
