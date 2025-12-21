import { SVGAttributes } from "react";

export function MaleIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      {/* Mars 심볼 ♂ */}
      <path d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8H424c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80l0 0h0v0zM176 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z" />
    </svg>
  );
}

export function FemaleIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      {/* Venus 심볼 ♀ */}
      <path d="M80 176a112 112 0 1 1 224 0A112 112 0 1 1 80 176zM232 272a144 144 0 1 0 -144 0v74.4c-17-9.6-31.5-23.7-41.9-40.7c-6.1-9.9-18.9-13.1-28.8-7s-13.1 18.9-7 28.8c14.5 23.8 35.3 43.2 60.3 56.1V448H48c-13.3 0-24 10.7-24 24s10.7 24 24 24H72v40c0 13.3 10.7 24 24 24s24-10.7 24-24V496h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H144V383.6c25-12.9 45.8-32.3 60.3-56.1c6.1-9.9 2.9-22.8-7-28.8s-22.8-2.9-28.8 7c-10.4 17-24.9 31.1-41.9 40.7V272z" />
    </svg>
  );
}
