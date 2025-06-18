import type { SVGProps } from 'react';
const SvgBackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#28323C"
      strokeLinecap="square"
      strokeWidth={1.5}
      d="m8 6-5 6 5 6M3.5 12h18"
    />
  </svg>
);
export default SvgBackIcon;
