import type { SVGProps } from 'react';
const SvgTohomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#28323C"
      strokeWidth={1.5}
      d="M13.5 20.5H20v-9L11.5 4 3 11.5v6a3 3 0 0 0 3 3h5v-5.75"
    />
  </svg>
);
export default SvgTohomeIcon;
