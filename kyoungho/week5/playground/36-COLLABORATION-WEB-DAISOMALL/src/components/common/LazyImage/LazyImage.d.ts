interface LazyImageProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    className?: string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    placeholder?: string;
}
declare const LazyImage: ({ src, alt, width, height, className, objectFit, placeholder }: LazyImageProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default LazyImage;
