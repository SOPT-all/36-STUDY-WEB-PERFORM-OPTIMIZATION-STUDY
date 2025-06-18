import type { SVGProps } from 'react';
const SvgBarcodeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="#28323C"
      strokeWidth={1.5}
      d="M8.31579 3H4.10526C3.52391 3 3.05263 3.47405 3.05263 4.05882V8.29412M15.6842 3H19.8947C20.4761 3 20.9474 3.47405 20.9474 4.05882V8.29412M15.6842 21H19.8947C20.4761 21 20.9474 20.5259 20.9474 19.9412V15.7059M8.31579 21H4.10526C3.52391 21 3.05263 20.5259 3.05263 19.9412L3.05263 15.7059M2 11.7353H22"
    />
  </svg>
);
export default SvgBarcodeIcon;
