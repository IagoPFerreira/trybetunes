import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      musics: '',
    };
  }

  componentDidMount() {
    getFavoriteSongs().then((musics) => {
      this.setState({
        isLoading: false,
        musics,
      });
    });
  }

  renderMusics = () => {
    const { musics } = this.state;

    return musics
      .map((music, index) => <MusicCard key={ index } index={ index } music={ music } />);
  }

  render() {
    const { isLoading } = this.state;
    console.log(isLoading);
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading /> : this.renderMusics() }
      </div>
    );
  }
}

export default Favorites;
