import { useEffect, useRef, useState } from 'react';
import type { SerializedStyles } from '@emotion/react';

interface LazyImageProps {
  src: string;
  alt: string;
  css?: SerializedStyles;
  style?: React.CSSProperties;
}

const LazyImage = ({ src, alt, css, style }: LazyImageProps) => {
  const [isInView, setIsInView] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : ''}
      alt={alt}
      css={css}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: imgLoaded ? 'none' : 'blur(10px)',
        transition: 'filter 0.4s',
        ...style,
      }}
      onLoad={() => setImgLoaded(true)}
    />
  );
};

export default LazyImage; 