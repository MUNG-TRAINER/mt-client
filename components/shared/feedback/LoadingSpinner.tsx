interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({
  message = "로딩 중...",
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "size-8",
    md: "size-12",
    lg: "size-16",
  };

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col items-center justify-center gap-4">
      <div
        className={`${sizeClasses[size]} border-4 border-(--mt-gray-light) border-t-(--mt-blue-point) rounded-full animate-spin`}
      />
      <p className="text-(--mt-gray)">{message}</p>
    </div>
  );
}
