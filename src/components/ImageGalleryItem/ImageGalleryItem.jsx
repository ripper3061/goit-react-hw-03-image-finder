import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem.styled';
import { GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imageUrl, tags }) => {
  return (
    <GalleryItem>
      <GalleryItemImage src={imageUrl} alt={tags} loading="lazy" />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
