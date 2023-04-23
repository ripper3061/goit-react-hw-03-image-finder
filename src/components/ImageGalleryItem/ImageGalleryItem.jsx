import PropTypes from 'prop-types';
import { Component } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { imageUrl, tags, largeImageUrl } = this.props;
    console.log(largeImageUrl);

    return (
      <>
        <GalleryItem onClick={this.toggleModal}>
          <GalleryItemImage src={imageUrl} alt={tags} loading="lazy" />
        </GalleryItem>
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImg={largeImageUrl}
            alt={tags}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
