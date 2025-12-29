import * as H from './RankingSection.style';
import SectionTitle from '@components/common/SectionTitle/SectionTitle';
import Pagination from '@components/common/pagination/Pagination';

interface RankingSectionProps {
  title1: string;
  subtitle?: string;
  onClickAll?: () => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  contents: { id: number; content: React.ReactNode }[];
}

const RankingSection = ({
  title1,
  subtitle,
  onClickAll,
  currentPage,
  onPageChange,
  contents,
}: RankingSectionProps) => (
  <div css={H.wrapper}>
    <SectionTitle title1={title1} subtitle={subtitle} onClickAll={onClickAll} />

    <div>{contents[currentPage - 1]?.content}</div>

    <Pagination
      totalPages={contents.length}
      currentPage={currentPage}
      onPageChange={onPageChange}
      isActive
      isHome={true}
    />
  </div>
);

export default RankingSection;
