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
    getMusics(id).then((musics) => this.setState({ musics }));
  }

  renderMusics = () => {
    const { musics } = this.state;
    if (musics) {
      return (
        musics
          .map((music, index) => {
            const { artistName, collectionName, artworkUrl100 } = music;
            if (index === 0) {
              return (
                <AlbumCard
                  src={ artworkUrl100 }
                  alt={ collectionName }
                  artistName={ artistName }
                  collectionName={ collectionName }
                  nameId="artist-name"
                  albumId="album-name"
                  key={ index }
                />
              );
            }
            return (
              <MusicCard
                key={ index }
                music={ music }
                index={ index }
              />
            );
          })
      );
    }
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        { this.renderMusics() }
      </div>
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
