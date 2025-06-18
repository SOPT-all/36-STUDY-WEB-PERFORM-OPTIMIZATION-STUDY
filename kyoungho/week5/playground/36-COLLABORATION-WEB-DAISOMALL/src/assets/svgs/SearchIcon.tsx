import type { SVGProps } from 'react';
const SvgSearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={11.5} cy={10.5} r={7.5} stroke="#28323C" strokeWidth={1.5} />
    <path stroke="#28323C" strokeWidth={1.5} d="m16 15.5 5.5 5.5" />
  </svg>
);
export default SvgSearchIcon;
