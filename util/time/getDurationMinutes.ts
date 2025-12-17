function parseTimeToHms(time: string): [number, number, number] {
  const parts = time.split(":");
  if (parts.length !== 3) {
    throw new Error(`Invalid time format: "${time}". Expected "HH:MM:SS".`);
  }
  const [h, m, s] = parts.map((value) => Number(value));
  if ([h, m, s].some((v) => Number.isNaN(v))) {
    throw new Error(
      `Invalid time value: "${time}". Hour, minute and second must be numbers.`
    );
  }
  if (h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) {
    throw new Error(
      `Out of range time value: "${time}". Expected 00:00:00–23:59:59.`
    );
  }
  return [h, m, s];
}
export default function getDurationMinutes(
  startTime: string, // "HH:MM:SS" to minutes
  endTime: string // "HH:MM:SS" to minutes
): number {
  const [sh, sm, ss] = parseTimeToHms(startTime);
  const [eh, em, es] = parseTimeToHms(endTime);
  const startMinutes = sh * 60 + sm + ss / 60;
  const endMinutes = eh * 60 + em + es / 60;

  return endMinutes - startMinutes;
}
