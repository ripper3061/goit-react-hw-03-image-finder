import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppLayout } from './App.styled';
import { Component } from 'react';
import { getImagesByName } from 'services/api';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: null,
    isLoading: false,
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

  render() {
    return (
      <AppLayout>
        <Searchbar
          onSubmit={this.handleSubmit}
          inputValue={this.state.searchQuery}
          onChange={this.handleChange}
        />
        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} />
        )}
      </AppLayout>
    );
  }
}
