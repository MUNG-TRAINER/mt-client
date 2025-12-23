const color = ["bg-red-200", "bg-blue-200", "bg-green-200", "bg-amber-200"];
export const randomColor = <T>(arr: T[]): string[] => {
  const array = arr.map(() => {
    const randomIndex = Math.floor(Math.random() * color.length);
    return color[randomIndex];
  });
  return array;
};
