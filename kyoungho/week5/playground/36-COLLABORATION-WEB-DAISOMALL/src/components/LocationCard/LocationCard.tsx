// useState import 제거 (사용하지 않음)
import * as S from './LocationCard.style';
// SVG 컴포넌트를 실제 SVG 파일로 변경
import StoreStatus from '@components/LocationCard/StoreStatus/StoreStatus';
import LocationTag from './LocationTag';
import StoreActionButton from '@components/LocationCard/StoreActionButton/StoreActionButton';

interface LocationCardProps {
  storeName: string;
  distance: string;
  address: string;
  isOpen: boolean;
  time: string;
  floor?: string;
  stand?: string;
  stock?: number;
  isSoldOut?: boolean;
  isFranchise?: boolean;
  isPickupAvailable?: boolean;
}

const LocationCard = ({
  storeName,
  distance,
  address,
  isOpen,
  time,
  floor,
  stand,
  stock,
  isSoldOut = false,
  isFranchise = false,
  isPickupAvailable = false,
}: LocationCardProps) => {
  // liked state 제거 (사용하지 않음)

  return (
    <div css={S.wrapper}>
      <div css={S.topSection}>
        <div css={S.storeInfo}>
          <div css={S.titleRow}>
            <span css={S.storeName}>{storeName}</span>
            <span css={S.distance}>{distance}</span>
            {isPickupAvailable && (
              <span css={S.pickupBadge}>픽업 가능 매장</span>
            )}
          </div>
          <p css={S.address}>{address}</p>
          <div css={S.statusRow}>
            <StoreStatus isOpen={isOpen} />
            <span css={S.circleDivider} />
            <span css={S.time}>{time}</span>
          </div>
        </div>
        <button onClick={() => {}} css={S.likeIcon}>
          <img src="/svgs/like-icon.svg" alt="좋아요" width={24} height={24} />
        </button>
      </div>

      {isFranchise ? (
        <div css={S.franchiseNotice}>가맹/유통점은 재고 확인이 어렵습니다.</div>
      ) : (
        <div css={S.bottomSection}>
          <div css={S.tagRow}>
            <div css={S.tagItem}>
              <LocationTag
                label={`${floor}F`}
                color={isSoldOut ? 'gray' : 'red'}
              />
            </div>

            <span css={S.divider} />

            <div css={S.tagItem}>
              <LocationTag
                label={`${stand}번`}
                color={isSoldOut ? 'gray' : 'red'}
              />
              <span css={isSoldOut ? S.standTextGray : S.standText}>매대</span>
            </div>

            <span css={S.divider} />

            <div css={S.tagItem}>
              {!isSoldOut ? (
                <>
                  <span css={S.standText}>재고</span>
                  <LocationTag label={`${stock ?? 0}개`} color="red" />
                </>
              ) : (
                <LocationTag label="일시품절" color="gray" />
              )}
            </div>
          </div>

          <StoreActionButton isSoldOut={isSoldOut} />
        </div>
      )}
    </div>
  );
};

export default LocationCard;
