import { GalleryItem } from './ImageGalleryItem.styled';
import { GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = () => {
  return (
    <GalleryItem>
      <GalleryItemImage loading="lazy" />
    </GalleryItem>
  );
};
