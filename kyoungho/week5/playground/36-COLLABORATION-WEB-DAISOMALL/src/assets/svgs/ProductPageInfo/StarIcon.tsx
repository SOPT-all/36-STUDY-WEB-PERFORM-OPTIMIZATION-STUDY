import type { SVGProps } from 'react';
const SvgStarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 11 12"
    {...props}
  >
    <path
      fill="#D70011"
      d="m5.499 9.083 3.3 1.993-.874-3.752 2.917-2.527-3.841-.33L5.499.924l-1.5 3.543-3.843.325 2.917 2.532-.876 3.756z"
    />
  </svg>
);
export default SvgStarIcon;
