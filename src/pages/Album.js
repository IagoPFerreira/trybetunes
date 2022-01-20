import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import AlbumCard from '../components/AlbumCard';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id, this.props).then((musics) => this.setState({ musics }));
  }

  renderAlbumCard = () => {
    const { musics } = this.state;
    if (musics) {
      const { artistName, collectionName, artworkUrl100 } = musics[0];
      return (
        <AlbumCard
          src={ artworkUrl100 }
          alt={ collectionName }
          artistName={ artistName }
          collectionName={ collectionName }
          nameId="artist-name"
          albumId="album-name"
          className="album-card"
        />
      );
    }
  }

  renderMusics = () => {
    const { musics } = this.state;
    if (musics) {
      const { artworkUrl100 } = musics[0];
      return (
        musics
          .map((music, index) => {
            const { trackName } = music;
            return (index !== 0 && <MusicCard
              key={ trackName }
              music={ music }
              image={ artworkUrl100 }
            />);
          })
      );
    }
  }

  render() {
    return (
      <main data-testid="page-album" className="page-album page">
        <Header />
        { this.renderAlbumCard() }
        <section className="songs-container">
          { this.renderMusics() }
        </section>
      </main>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
