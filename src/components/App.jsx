import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { AppLayout, ErrorMessage } from './App.styled';
import { getImagesByName } from 'services/api';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: null,
    isLoading: false,
    isLoadMoreShown: false,
    error: '',
  };

  componentDidMount() {
    if (this.state.isLoading) {
      this.fetchImages();
    }
  }

  componentDidUpdate() {
    if (this.state.isLoading) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { searchQuery, page } = this.state;

    try {
      const fetchedImages = await getImagesByName(searchQuery, page);
      const images = [...this.state.images, ...fetchedImages.hits];
      this.setState({
        images: images,
        isLoadMoreShown: images.length < fetchedImages.totalHits,
        error:
          images.length === 0
            ? 'Sorry, there are no images matching your search query.'
            : '',
      });
    } catch {
      this.setState({
        error: 'Ops, failed to load. Please try again.',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      images: [],
      page: 1,
      isLoading: true,
    });
  };

  handleChange = event => {
    this.setState({ searchQuery: event.currentTarget.value });
  };

  handleClickOnLoadBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  disableButton = () => {
    return this.state.searchQuery === '' ? true : false;
  };

  render() {
    const { isLoading, images, error, isLoadMoreShown, searchQuery } =
      this.state;

    return (
      <AppLayout>
        <Searchbar
          onSubmit={this.handleSubmit}
          inputValue={searchQuery}
          activBtn={this.disableButton()}
          onChange={this.handleChange}
        />
        <Loader isLoading={isLoading} />
        {images.length > 0 && <ImageGallery images={images} />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!isLoading && isLoadMoreShown && (
          <Button onClick={this.handleClickOnLoadBtn} />
        )}
      </AppLayout>
    );
  }
}