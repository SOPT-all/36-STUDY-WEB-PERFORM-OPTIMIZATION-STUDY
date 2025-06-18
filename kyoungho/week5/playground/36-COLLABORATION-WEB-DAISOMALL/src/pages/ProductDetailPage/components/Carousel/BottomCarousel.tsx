import ImageCarousel from '@components/ImageCarousel/ImageCarousel';
import BottomCarousel1 from '@assets/pngs/BottomCarousel1.png';
import BottomCarousel2 from '@assets/pngs/BottomCarousel2.png';

const bannerImages = [BottomCarousel1, BottomCarousel2];
const BottomCarousel = () => <ImageCarousel images={bannerImages}  />;

export default BottomCarousel;
