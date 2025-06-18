import type { SVGProps } from 'react';
const SvgCartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="#28323C" strokeWidth={1.5} d="M6 7h13l2 14H4z" />
    <path
      stroke="#28323C"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M15 9V4.5A2.5 2.5 0 0 0 12.5 2v0A2.5 2.5 0 0 0 10 4.5V9"
    />
  </svg>
);
export default SvgCartIcon;
