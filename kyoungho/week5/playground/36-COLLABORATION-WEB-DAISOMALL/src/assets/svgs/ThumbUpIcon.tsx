import type { SVGProps } from 'react';
const SvgThumbUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 17"
    {...props}
  >
    <g clipPath="url(#thumb-up-icon_svg__a)">
      <mask
        id="thumb-up-icon_svg__b"
        width={12}
        height={13}
        x={2}
        y={2}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <path fill="#fff" d="M14 2.502H2v12h12z" />
      </mask>
      <g fill="#646F7C" mask="url(#thumb-up-icon_svg__b)">
        <path d="M4 6.502H3v5h1zM13 9.657v-3.41H9.815V3.502h-1.76l-3.07 3.04v4.96h1v1h4.14l2.87-2.845zM8.46 4.502h.355v2.745h3.18v2l-1.115 1.135-1.155 1.12H5.99v-4.55z" />
      </g>
    </g>
    <defs>
      <clipPath id="thumb-up-icon_svg__a">
        <path fill="#fff" d="M0 .5h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgThumbUpIcon;
