import { useState } from 'react';
import * as T from './TodayCard.style';
// SVG 컴포넌트를 실제 SVG 파일로 변경

interface TodayCardProps {
  imageUrl: string;
  profileImage: string;
  username: string;
  title: string;
  views: string;
}

const TodayCard = ({
  imageUrl,
  profileImage,
  username,
  title,
  views,
}: TodayCardProps) => {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => setBookmarked((prev) => !prev);

  return (
    <div css={T.wrapper}>
      <img src={imageUrl} alt="대표 이미지" css={T.mainImage} />
      <div css={T.contentArea}>
        <div css={T.infoGroup}>
          <div css={T.topRow}>
            <div css={T.profileArea}>
              <img src={profileImage} alt={username} css={T.profileImage} />
              <span css={T.username}>{username}</span>
            </div>
            <button
              onClick={toggleBookmark}
              css={[
                T.bookmarkButton,
                bookmarked ? T.bookmarkIconActive : T.bookmarkIcon,
              ]}
              aria-label="북마크"
            >
              <img src="/svgs/bookmark-icon.svg" alt="북마크" width={20} height={20} />
            </button>
          </div>

          <p css={T.title}>{title}</p>
        </div>

        <div css={T.viewRow}>
          <span css={T.viewCount}>{views.toLocaleString()}명</span>
          <span css={T.viewText}>봤어요</span>
        </div>
      </div>
    </div>
  );
};

export default TodayCard;
