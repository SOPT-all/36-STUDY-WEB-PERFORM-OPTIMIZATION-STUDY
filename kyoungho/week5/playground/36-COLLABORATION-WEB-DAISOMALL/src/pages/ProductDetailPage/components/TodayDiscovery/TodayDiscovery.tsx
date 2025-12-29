import TodayCard from '@components/ProductCard/TodayCard/TodayCard';
import * as S from './TodayDiscovery.style';
import TodayImg1 from '@assets/pngs/TodayImg1.webp';
import TodayImg2 from '@assets/pngs/TodayImg2.webp';
import TodayImg3 from '@assets/pngs/TodayImg3.webp';
import TodayImgProfile1 from '@assets/pngs/TodayImgProfile1.webp';
import TodayImgProfile2 from '@assets/pngs/TodayImgProfile2.webp';
import TodayImgProfile3 from '@assets/pngs/TodayImgProfile3.webp';

const TodayDiscovery = () => (
  <>
    <div css={S.Wrapper}>
      <p css={S.Title}>오늘의 발견</p>
      <div css={S.Container}>
        <TodayCard
          imageUrl={TodayImg1}
          profileImage={TodayImgProfile1}
          username="왓정"
          title="겨울철 가성비피부관리 화장품후기 (VT리들샷, 린제이모델링팩 등)"
          views={'37,120'}
        />
        <TodayCard
          imageUrl={TodayImg2}
          profileImage={TodayImgProfile2}
          username="수민"
          title="ㅎㅎ 뷰티아이템 + 수납합 자랑해봅니다"
          views={'3,529'}
        />
        <TodayCard
          imageUrl={TodayImg3}
          profileImage={TodayImgProfile3}
          username="다현"
          title="다이소 제품으로 하루를 더욱 유용하게 사용하기!"
          views={'10,306'}
        />
      </div>
    </div>
  </>
);

export default TodayDiscovery;
