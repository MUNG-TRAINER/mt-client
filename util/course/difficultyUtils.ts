/**
 * 난이도에 따른 색상 클래스를 반환합니다.
 */
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "초급":
      return "bg-green-100 text-green-700";
    case "중급":
      return "bg-yellow-100 text-yellow-700";
    case "고급":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

/**
 * 난이도 레이블을 반환합니다.
 */
export function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case "초급":
      return "초급";
    case "중급":
      return "중급";
    case "고급":
      return "고급";
    default:
      return difficulty;
  }
}

/**
 * 난이도 배지 컴포넌트를 위한 설정을 반환합니다.
 */
export function getDifficultyBadgeConfig(difficulty: string | undefined): {
  label: string;
  color: string;
} | null {
  if (!difficulty) return null;

  const config = {
    초급: { label: "초급", color: "bg-green-100 text-green-700" },
    중급: { label: "중급", color: "bg-yellow-100 text-yellow-700" },
    고급: { label: "고급", color: "bg-red-100 text-red-700" },
  };

  return (
    config[difficulty as keyof typeof config] || {
      label: difficulty,
      color: "bg-gray-100 text-gray-700",
    }
  );
}
