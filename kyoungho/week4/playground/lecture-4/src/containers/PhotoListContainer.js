import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PhotoList from '../components/PhotoList';
import { fetchPhotos } from '../redux/photos';

function PhotoListContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  // 방법 2: shallowEqual을 사용한 객체 비교 + 필터링 로직 분리
  const { photosData, loading } = useSelector(state => ({
    photosData: state.photos.data,
    loading: state.photos.loading,
  }), shallowEqual);

  const currentCategory = useSelector(state => state.category.category);

  // useMemo를 사용하여 필터링된 photos 배열을 메모이제이션
  const filteredPhotos = useMemo(() => {
    if (currentCategory === 'all') {
      return photosData;
    }
    const filtered = photosData.filter(photo => photo.category === currentCategory);
    return filtered;
  }, [currentCategory, photosData]);

  if (loading === 'error') {
    return <span>Error!</span>;
  }

  if (loading !== 'done') {
    return <span>Loading...</span>;
  }

  return (
    <PhotoList photos={filteredPhotos} />
  );
}

export default PhotoListContainer;
