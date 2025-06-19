// SVG 컴포넌트를 실제 SVG 파일로 변경
import * as S from './Comment.style';

interface CommentProps {
  nickname: string;
  profileImageUrl: string;
  rating: number;
  firstKeyword: string;
  secondKeyword: string;
  thirdKeyword: string;
  content: string;
  likes: number;
}

const Comment = ({
  nickname,
  profileImageUrl,
  rating,
  firstKeyword,
  secondKeyword,
  thirdKeyword,
  content,
  likes,
}: CommentProps) => (
  <div css={S.Wrapper}>
    <div css={S.FirstContainer}>
      <div css={S.FirstLeftContainer}>
        <div css={S.ProfileSection}>
          {profileImageUrl ? (
            <img src={profileImageUrl} alt="프로필" width={20} height={20} />
          ) : (
            <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#f0f0f0' }} />
          )}
          <p css={S.BodyTextStyle}>{nickname}</p>
        </div>
        <div css={S.MiddleSection}>
                        <img src="/svgs/star-icon-red.svg" alt="별점" width={11} height={11} />
          <p css={S.CaptionTextStyle}>{rating}점 | 2025-05-01</p>
        </div>
      </div>
                  <img src="/svgs/menu-icon.svg" alt="메뉴" width={24} height={24} />
    </div>

    <div css={S.SecondContainer}>
      <div css={S.KeywordsContainer}>
        <p css={S.KeyText}>보습력</p>
        <p css={S.ValueText}>{firstKeyword}</p>
      </div>
      <div css={S.KeywordsContainer}>
        <p css={S.KeyText}>자극도</p>
        <p css={S.ValueText}>{secondKeyword}</p>
      </div>
      <div css={S.KeywordsContainer}>
        <p css={S.KeyText}>흡수력</p>
        <p css={S.ValueText}>{thirdKeyword}</p>
      </div>
    </div>

    <div css={S.ThirdContainer}>
      <p css={S.Review}>{content}</p>
      <p css={S.More}>더보기</p>
    </div>

    <div css={S.ButtonContainer}>
      <div css={S.LeftSection}>
        <p css={S.ButtonText}>도움돼요</p>
      </div>
      <div css={S.RightSection}>
                  <img src="/svgs/thumbup-icon.svg" alt="좋아요" width={16} height={16} />
        <p css={S.CaptionTextStyle2}>{likes}</p>
      </div>
    </div>
  </div>
);

export default Comment;
