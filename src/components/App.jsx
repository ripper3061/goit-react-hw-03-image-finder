import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { AppLayout } from './App.styled';
import { getImagesByName } from 'services/api';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: null,
    isLoading: false,
    isLoadMoreShown: false,
    error: false,
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
    try {
      const fetchedImages = await getImagesByName(
        this.state.searchQuery,
        this.state.page
      );
      const images = [...this.state.images, ...fetchedImages.hits];
      this.setState({
        images: images,
        isLoadMoreShown: images.length < fetchedImages.totalHits,
      });
    } catch {
      this.setState({
        error: true,
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
    return (
      <AppLayout>
        <Searchbar
          onSubmit={this.handleSubmit}
          inputValue={this.state.searchQuery}
          activBtn={this.disableButton()}
          onChange={this.handleChange}
        />
        <Loader isLoading={this.state.isLoading} />
        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} />
        )}
        {!this.state.isLoading && this.state.isLoadMoreShown && (
          <Button onClick={this.handleClickOnLoadBtn} />
        )}
      </AppLayout>
    );
  }
}
