/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/react';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholder?: string;
}

const placeholderStyle = css`
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
`;

const imageStyle = css`
  transition: opacity 0.3s ease;
`;

const LazyImage = ({ 
  src, 
  alt, 
  width = '100%', 
  height = 'auto',
  className,
  objectFit = 'cover',
  placeholder = '이미지 로딩 중...'
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={imgRef}
      css={css`
        width: ${width};
        height: ${height};
        ${!isLoaded && placeholderStyle}
      `}
      className={className}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          css={css`
            width: 100%;
            height: 100%;
            object-fit: ${objectFit};
            opacity: ${isLoaded ? 1 : 0};
            ${imageStyle}
          `}
        />
      )}
      {!isLoaded && isInView && (
        <div>{placeholder}</div>
      )}
    </div>
  );
};

export default LazyImage; 