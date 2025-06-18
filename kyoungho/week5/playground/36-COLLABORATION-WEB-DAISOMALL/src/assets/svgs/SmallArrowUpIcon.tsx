import type { SVGProps } from 'react';

const SmallArrowUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="12"
    height="7"
    viewBox="0 0 12 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11 6L6 1L1 6" stroke="currentColor" strokeLinecap="square" />
  </svg>
);

export default SmallArrowUpIcon;
