/**
 * 황금각(Golden Angle) 기반 색상 생성 유틸리티
 *
 * 황금각(약 137.5도)은 피보나치 수열과 관련된 수학적 상수로,
 * ID 값을 기반으로 시각적으로 구분되는 색상을 생성하는 데 사용됩니다.
 */

/**
 * 황금각 (Golden Angle) 상수
 * 360° × (1 - 1/φ) ≈ 137.508°
 * φ(파이)는 황금비 (1 + √5) / 2
 */
const GOLDEN_ANGLE = 137.5;

/**
 * 기본 채도(Saturation) 값 (0-100%)
 */
const DEFAULT_SATURATION = 70;

/**
 * 기본 명도(Lightness) 값 (0-100%)
 */
const DEFAULT_LIGHTNESS = 80;

/**
 * ID를 기반으로 HSL 색상을 생성합니다.
 * 황금각을 사용하여 연속된 ID에 대해 시각적으로 구분되는 색상을 생성합니다.
 *
 * @param id - 색상을 생성할 기준이 되는 고유 ID
 * @param saturation - 채도 (0-100, 기본값: 70)
 * @param lightness - 명도 (0-100, 기본값: 80)
 * @returns HSL 색상 문자열 (예: "hsl(137, 70%, 80%)")
 *
 * @example
 * ```typescript
 * const color = generateColorFromId(1); // "hsl(137, 70%, 80%)"
 * const customColor = generateColorFromId(2, 60, 70); // "hsl(275, 60%, 70%)"
 * ```
 */
export function generateColorFromId(
  id: number,
  saturation: number = DEFAULT_SATURATION,
  lightness: number = DEFAULT_LIGHTNESS
): string {
  const hue = (id * GOLDEN_ANGLE) % 360;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * ID를 기반으로 배경색 인라인 스타일 객체를 생성합니다.
 *
 * @param id - 색상을 생성할 기준이 되는 고유 ID
 * @param saturation - 채도 (0-100, 기본값: 70)
 * @param lightness - 명도 (0-100, 기본값: 80)
 * @returns React 인라인 스타일 객체
 *
 * @example
 * ```tsx
 * <div style={getBackgroundColorStyle(dogId)}>
 *   ...
 * </div>
 * ```
 */
export function getBackgroundColorStyle(
  id: number,
  saturation?: number,
  lightness?: number
): React.CSSProperties {
  return {
    backgroundColor: generateColorFromId(id, saturation, lightness),
  };
}
