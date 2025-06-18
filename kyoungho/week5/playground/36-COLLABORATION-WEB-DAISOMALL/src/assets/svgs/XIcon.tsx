import type { SVGProps } from 'react';
const SvgXIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <path
      fill="#fff"
      d="m6.515 5.657 2.571 2.57-.514.515L6 6.172l-2.572 2.57-.514-.514 2.571-2.571-2.571-2.572.514-.514 2.572 2.571 2.57-2.57.515.514z"
    />
  </svg>
);
export default SvgXIcon;
