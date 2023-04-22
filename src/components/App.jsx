import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppLayout } from './App.styled';
import { Component } from 'react';
import { getImagesByName } from 'services/api';

export class App extends Component {
  state = {
    images: [],
  };

  async componentDidMount() {
    const images = await getImagesByName();
    this.setState({ images: images.hits });
  }
  render() {
    return (
      <AppLayout>
        <Searchbar />
        <ImageGallery images={this.state.images} />
      </AppLayout>
    );
  }
}
