/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import * as S from './BrandInfo.style';

interface BrandInfoProps {
  brandName: string;
  brandDescription: string;
  brandImageUrl: string;
}

const BrandInfo = ({
  brandName,
  brandDescription,
  brandImageUrl
}: BrandInfoProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error('브랜드 이미지 로딩 실패');
    setImageError(true);
  };

  // 실제 콘텐츠를 보여주는 함수
  const renderContent = () => (
    <div css={S.contentWrapper}>
      <figure css={S.imageContainer}>
        <img 
          css={S.brandImage} 
          src={imageError ? 'https://via.placeholder.com/70' : brandImageUrl} 
          alt={`${brandName} 브랜드 이미지`} 
          onError={handleImageError}
        />
      </figure>
      <article css={S.infoContainer}>
        <h2 css={S.brandName}>{brandName}</h2>
        <p css={S.brandDescription}>{brandDescription}</p>
      </article>
    </div>
  );

  return (
    <section css={S.container}>
      {renderContent()}
    </section>
  );
};

export default BrandInfo;