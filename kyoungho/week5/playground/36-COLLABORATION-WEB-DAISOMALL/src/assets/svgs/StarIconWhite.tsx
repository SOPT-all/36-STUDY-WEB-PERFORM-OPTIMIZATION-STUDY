import type { SVGProps } from 'react';
const SvgStarIconWhite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 9 9"
    {...props}
  >
    <g clipPath="url(#star-icon-white_svg__a)">
      <path
        fill="#fff"
        d="m4.499 7.022 2.7 1.631-.715-3.07L8.87 3.516l-3.143-.27-1.229-2.9-1.227 2.9-3.145.266 2.387 2.071-.717 3.073z"
      />
    </g>
    <defs>
      <clipPath id="star-icon-white_svg__a">
        <path fill="#fff" d="M0 0h9v9H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgStarIconWhite;
