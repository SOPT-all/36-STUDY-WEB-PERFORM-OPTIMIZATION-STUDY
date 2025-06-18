import type { SVGProps } from 'react';
const SvgMypageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={11.25} cy={7.25} r={3.5} stroke="#28323C" strokeWidth={1.5} />
    <path
      stroke="#28323C"
      strokeWidth={1.5}
      d="M2 21a8 8 0 0 1 8-8h3a8 8 0 0 1 8 8v1H2z"
    />
  </svg>
);
export default SvgMypageIcon;
