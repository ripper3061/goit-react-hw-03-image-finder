import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryLayout } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryLayout>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            imageUrl={image.webformatURL}
            tags={image.tags}
          />
        );
      })}
    </ImageGalleryLayout>
  );
};
