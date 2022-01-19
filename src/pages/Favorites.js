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
    this.updateFavoritesSongs();
  }

  componentDidUpdate() {
    this.updateFavoritesSongs();
  }

  updateFavoritesSongs = () => {
    const { isLoading } = this.state;
    getFavoriteSongs().then((musics) => {
      if (isLoading) {
        this.setState(() => ({
          musics,
          isLoading: false,
        }));
      }
    });
  };

  handleChange = () => {
    this.setState({ isLoading: true });
  };

  renderMusics = () => {
    const { musics } = this.state;

    if (musics) {
      return musics.map((music) => (
        <MusicCard
          key={ music.trackName }
          music={ music }
          onChange={ this.handleChange }
        />
      ));
    }
  };

  render() {
    const { musics } = this.state;
    return (
      <section data-testid="page-favorites" className="page-favorites page">
        <Header />
        <section className="songs-container">
          {!musics ? <Loading /> : this.renderMusics()}
        </section>
      </section>
    );
  }
}

export default Favorites;
