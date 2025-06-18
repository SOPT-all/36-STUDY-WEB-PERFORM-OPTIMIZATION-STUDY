import type { SVGProps } from 'react';
const SvgMultipleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1 0.75L5.5 5.25" stroke="#28323C" strokeWidth="0.7" />
    <path d="M5.5 0.75L1 5.25" stroke="#28323C" strokeWidth="0.7" />
  </svg>
);
export default SvgMultipleIcon;
