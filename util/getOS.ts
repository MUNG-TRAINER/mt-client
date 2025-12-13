type TReturnOS = "ios" | "android" | "mac" | "windows" | "unknown";
const getOS = (): TReturnOS => {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  if (/Macintosh/i.test(ua)) return "mac";
  if (/Windows/i.test(ua)) return "windows";
  return "unknown";
};
export default getOS;
