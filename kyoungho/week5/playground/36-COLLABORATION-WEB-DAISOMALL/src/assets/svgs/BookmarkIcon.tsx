import type { SVGProps } from 'react';
const SvgBookmarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="#C5C8CE"
      strokeWidth={1.5}
      strokeLinejoin="bevel"
      d="M18 4H6V20L12 13.5L18 20V4Z"
    />
  </svg>
);
export default SvgBookmarkIcon;
