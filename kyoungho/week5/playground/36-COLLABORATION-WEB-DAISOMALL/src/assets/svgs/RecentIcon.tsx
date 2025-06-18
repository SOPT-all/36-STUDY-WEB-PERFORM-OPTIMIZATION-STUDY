import type { SVGProps } from 'react';
const SvgRecentIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <path
      fill="#28323C"
      d="m3.864 13.421-.56.498.56.63.56-.63zM1.56 9.701a.75.75 0 0 0-1.122.997zm5.727.997a.75.75 0 1 0-1.121-.996zM22 12h-.75c0 4.564-3.66 8.25-8.16 8.25v1.5c5.343 0 9.66-4.372 9.66-9.75zM3.864 13.421h.75c0-5.802 4.027-9.671 8.477-9.671v-1.5c-5.391 0-9.977 4.658-9.977 11.171zM13.09 3v.75c4.499 0 8.159 3.686 8.159 8.25h1.5c0-5.378-4.317-9.75-9.66-9.75zM1 10.2l-.56.498 2.863 3.221.56-.498.561-.498-2.863-3.221zm2.864 3.221.56.498 2.864-3.22-.56-.499-.561-.498-2.864 3.22z"
    />
    <path
      stroke="#28323C"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M13 7v6l-4 4"
    />
  </svg>
);
export default SvgRecentIcon;
