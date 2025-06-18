import type { SVGProps } from 'react';
const SvgContactIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#contact-icon_svg__a)">
      <path
        fill="#D70011"
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.548 16.723c1.467.942 3 .256 4.062-.54a1.52 1.52 0 0 0 .083-2.275l-1.239-1.317a2.25 2.25 0 0 1-2.023.509 3.96 3.96 0 0 1-2.407-1.857 2.33 2.33 0 0 1 .539-2.546l-1.381-1.26a1.36 1.36 0 0 0-1.975-.018c-1.005 1.193-1.63 3-.89 4.157a17.3 17.3 0 0 0 5.231 5.147"
      />
    </g>
    <defs>
      <clipPath id="contact-icon_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgContactIcon;
