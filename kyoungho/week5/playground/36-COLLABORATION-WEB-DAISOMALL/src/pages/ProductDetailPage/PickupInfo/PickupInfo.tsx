import * as S from './PickupInfo.style';
import MethodListSection from './MethodListSection';
import PickupStoreSection from './PickupStoreSection';
import PickupDetailsSection from './PickupDetailsSection';
import NavigationButton from '@components/buttons/navigationButton/NavigationButton';

const PickupInfo = () => {

  return (
    <div css={S.Wrapper}>
      <h2 css={S.Title}>배송방법</h2>
      <MethodListSection />
      
      <div css={S.InfoSection}>
        <PickupStoreSection />
        <PickupDetailsSection />
      </div>

      <div css={S.ButtonContainer}>
        <NavigationButton
            text="구매 가능 다이소 매장 찾기"
            to="#" // 임시 링크
            variant="gray" 
        />
      </div>
    </div>
  );
};

export default PickupInfo;