import type { SVGProps } from 'react';
const SvgOfflineSearchActive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <path
      stroke="#D70011"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M19.414 3H3.49a1 1 0 0 0-1 1v4.146a1 1 0 0 0 1 1h15.926a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1ZM9.128 9.146H5.025a1 1 0 0 0-1 1v7.218a1 1 0 0 0 1 1h3.771"
    />
    <path
      stroke="#D70011"
      strokeWidth={1.5}
      d="M13.074 13.488c1.793-1.793 4.803-1.812 6.723.013 1.92 1.827 1.976 4.762.183 6.555-1.794 1.793-4.804 1.812-6.724-.014s-1.975-4.76-.182-6.554Z"
    />
    <path
      fill="#D70011"
      d="M22.46 23.497a.75.75 0 0 0 1.061-1.06zm-2.198-3.26-.53.531 2.728 2.729.53-.53.531-.53-2.729-2.73z"
    />
  </svg>
);
export default SvgOfflineSearchActive;
