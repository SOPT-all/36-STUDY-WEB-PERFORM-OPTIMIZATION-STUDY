import type { SVGProps } from 'react';
const SvgShareIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#28323C"
      strokeLinecap="square"
      strokeWidth={2}
      d="M1.75 12.75v5.5h16.5v-5.5M4.75 6.15l4.95-4.4 4.95 4.4M9.7 2.85v9.9"
    />
  </svg>
);
export default SvgShareIcon;
