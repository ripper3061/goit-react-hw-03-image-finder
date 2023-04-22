import { GalleryItem } from './ImageGalleryItem.styled';
import { GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imageUrl, tags }) => {
  return (
    <GalleryItem>
      <GalleryItemImage src={imageUrl} alt={tags} loading="lazy" />
    </GalleryItem>
  );
};
