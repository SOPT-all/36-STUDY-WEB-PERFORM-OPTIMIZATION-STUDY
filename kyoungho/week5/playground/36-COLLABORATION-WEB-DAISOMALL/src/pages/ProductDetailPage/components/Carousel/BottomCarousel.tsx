import ImageCarousel from '@components/ImageCarousel/ImageCarousel';
import BottomCarousel1 from '@assets/pngs/BottomCarousel1.webp';
import BottomCarousel2 from '@assets/pngs/BottomCarousel2.webp';

const bannerImages = [BottomCarousel1, BottomCarousel2];
const BottomCarousel = () => <ImageCarousel images={bannerImages}  />;

export default BottomCarousel;
