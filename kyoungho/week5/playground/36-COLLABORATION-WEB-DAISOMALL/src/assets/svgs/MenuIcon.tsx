import type { SVGProps } from 'react';
const SvgMenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#menu-icon_svg__a)">
      <path
        fill="#28323C"
        d="M13.626 6.814A1.813 1.813 0 1 0 10 6.812a1.813 1.813 0 0 0 3.626.002m0 10.876a1.813 1.813 0 1 0-3.626 0 1.813 1.813 0 0 0 3.626 0m0-5.438a1.813 1.813 0 1 0-3.626.002 1.813 1.813 0 0 0 3.626-.003z"
      />
    </g>
    <defs>
      <clipPath id="menu-icon_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgMenuIcon;
