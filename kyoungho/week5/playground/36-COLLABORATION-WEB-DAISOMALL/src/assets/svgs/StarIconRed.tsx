import type { SVGProps } from 'react';
const SvgStarIconRed = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 11 11"
    {...props}
  >
    <g clipPath="url(#star-icon-red_svg__a)">
      <path
        fill="#D70011"
        d="m5.499 8.583 3.3 1.993-.874-3.752 2.917-2.527-3.841-.33L5.499.424l-1.5 3.543-3.843.325 2.917 2.532-.876 3.756z"
      />
    </g>
    <defs>
      <clipPath id="star-icon-red_svg__a">
        <path fill="#fff" d="M0 0h11v11H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgStarIconRed;
