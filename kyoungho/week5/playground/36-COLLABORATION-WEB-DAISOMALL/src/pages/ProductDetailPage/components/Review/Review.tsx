/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from 'react';
import SectionTitle from '@components/common/SectionTitle/SectionTitle';
import * as S from './Review.style';
import RenderStars from './RenderStars';
import Keywords from './Keywords';
import PhotoScrollList from './PhotoScrollList';
import Divider from '@components/common/divider/Divider';
import theme from '@styles/theme';
import Comment from './Comment';
import NavigationButton from '@components/buttons/navigationButton/NavigationButton';
import type { GetReviewsResponseData, GetProductDetailResponseData } from '@app-types/product';

interface ReviewProps {
  reviewData?: GetReviewsResponseData | null;
  productData?: GetProductDetailResponseData | null;
  reviewImages?: string[];
}

const Review = ({ reviewData, productData, reviewImages = [] }: ReviewProps) => {
  // API 데이터에서 평균 별점과 리뷰 수 가져오기
  const averageRating = productData?.ratingAvg ? parseFloat(productData.ratingAvg) : 0;
  const reviewCount = productData?.reviewCount ? parseInt(productData.reviewCount) : 0;
  
  // 실제 리뷰 데이터 또는 빈 배열
  const reviews = reviewData?.reviews || [];

  console.log('Review 컴포넌트 데이터:', {
    averageRating,
    reviewCount,
    reviewsLength: reviews.length,
    reviewImagesLength: reviewImages.length
  });

  // 전체 리뷰 이미지 수집 과정 상세 로그
  console.log('=== 전체 리뷰 이미지 수집 분석 ===');
  reviews.forEach((review, index) => {
    console.log(`리뷰 ${index + 1}:`, {
      reviewId: review.reviewId,
      nickname: review.nickname,
      hasProfileImage: !!review.profileImageUrl,
      profileImageUrl: review.profileImageUrl,
      reviewImagesCount: review.images?.length || 0,
      reviewImageUrls: review.images?.map(img => img.imageUrl) || []
    });
  });
  console.log('PhotoScrollList에 전달될 전체 이미지들:', reviewImages);
  console.log('====================================');

  return (
    <div css={S.Wrapper}>
      <div css={S.UpperContainer}>
        <SectionTitle
          title1="리뷰"
          title2={reviewCount.toString()}
          title2Color="#D70011"
          onClickAll={() => console.log('전체보기 클릭')}
        />

        <div css={S.RatingContainer}>
          <p css={S.averageRating}>{averageRating.toFixed(1)}</p>
          <RenderStars score={averageRating} />
        </div>

        <div css={S.KeywordContainer}>
          <Keywords label="보습력" description="촉촉해요" percent={66} />
          <Keywords label="자극도" description="보통이에요" percent={40} />
          <Keywords label="흡수력" description="마음에 들어요" percent={84} />
        </div>
      </div>

      <div>
        <Divider />
        <div css={S.MiddleContainer}>
          <SectionTitle
            title1="사진&동영상"
            onClickAll={() => console.log('전체보기 클릭')}
          />
        </div>
        <PhotoScrollList 
          isLoading={false}
          imageUrls={reviewImages}
          onMoreClick={() => console.log('사진&동영상 더보기 클릭')}
        />
      </div>

      <Divider height="8px" color={theme.colors['gray-06']} />

      <div css={S.LowerContainer}>
        <div css={S.FilteringContainer}>
          <div css={S.ButtonContainer}>
            <button css={S.AllBtn}>전체</button>
            <button css={S.RepurchaseBtn}>재구매</button>
          </div>
          <div css={S.DropdownContainer}>
            <p css={S.Recommendation}>추천순</p>
            <img src="/svgs/small-arrow-down-icon.svg" alt="Arrow Down" css={S.ArrowIcon} />
          </div>
        </div>

        {/* 실제 API 리뷰 데이터로 렌더링 */}
        {reviews.length > 0 ? (
          reviews.slice(0, 3).map((review, index) => {
            // 각 리뷰의 이미지 정보 콘솔 출력
            console.log(`=== 리뷰 ${index + 1} (ID: ${review.reviewId}) ===`);
            console.log('닉네임:', review.nickname);
            console.log('프로필 사진 URL:', review.profileImageUrl);
            console.log('별점:', review.rating);
            console.log('내용:', review.content);
            console.log('리뷰 이미지들:', review.images);
            console.log('리뷰 이미지 URL들:', review.images?.map(img => img.imageUrl) || []);
            console.log('리뷰 이미지 개수:', review.images?.length || 0);
            console.log('----------------------------------');
            
            return (
              <div key={review.reviewId}>
                <Comment
                  nickname={review.nickname}
                  profileImageUrl={review.profileImageUrl}
                  rating={review.rating}
                  firstKeyword="촉촉해요" // 키워드는 추후 API에서 제공될 때 업데이트
                  secondKeyword="순해요"
                  thirdKeyword="마음에 들어요"
                  content={review.content}
                  likes={0} // 좋아요 수는 추후 API에서 제공될 때 업데이트
                />
                {index < reviews.slice(0, 3).length - 1 && <Divider />}
              </div>
            );
          })
        ) : (
          <div>리뷰가 없습니다.</div>
        )}
        
        {reviews.length > 0 && (
          <>
            <Divider />
            <NavigationButton
              text="고객리뷰 전체보기"
              count={reviewCount}
              to="/product-detail-bottom"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Review;
