export default function getDurationMinutes(
  startTime: string,
  endTime: string
): number {
  const [sh, sm, ss] = startTime.split(":").map(Number);
  const [eh, em, es] = endTime.split(":").map(Number);

  const startMinutes = sh * 60 + sm + ss / 60;
  const endMinutes = eh * 60 + em + es / 60;

  return endMinutes - startMinutes;
}
