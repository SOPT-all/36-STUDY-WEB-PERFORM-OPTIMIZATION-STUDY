import type { SVGProps } from 'react';
const SvgDeliveryboxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <g clipPath="url(#deliverybox-icon_svg__a)">
      <path fill="#BF8B56" d="M2.4 0h27.2L32 6.4H0z" />
      <path fill="#BF8B56" d="M0 32V6.4h32V32zM0 6.4 2.4 0h27.2L32 6.4z" />
      <path fill="#D3A16D" d="M32 6.4H0V32h32z" />
      <path fill="#CBB793" d="M19.2 0h-6.4v6.4h6.4z" />
      <path fill="#D6C6A7" d="M19.2 6.4h-6.4v3.2h6.4z" />
    </g>
    <defs>
      <clipPath id="deliverybox-icon_svg__a">
        <rect width={32} height={32} fill="#fff" rx={8} />
      </clipPath>
    </defs>
  </svg>
);
export default SvgDeliveryboxIcon;
