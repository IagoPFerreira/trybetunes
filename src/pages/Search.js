import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      disabled: true,
      artistName: '',
      artistAlbuns: null,
    };

    this.name = '';
  }

  checkNameLength = ({ target: { value } }) => {
    const minimunNameLength = 2;

    const artistName = value.split(' ')
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(' ');

    this.setState({ artistName });

    if (value.length >= minimunNameLength) {
      this.setState({ disabled: false });
      this.name = artistName;
    }
  }

  handleSearch = () => {
    const { artistName } = this.state;

    this.setState({ isLoading: true });

    searchAlbumsAPI(artistName).then((result) => {
      this.setState({
        isLoading: false,
        artistAlbuns: result,
        artistName: '',
      });
    });
  }

  renderAlbuns = () => {
    const { artistAlbuns } = this.state;

    return (artistAlbuns
      .map(({ collectionId, artistName, collectionName, artworkUrl100 }) => (
        <Link
          key={ collectionId }
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <AlbumCard
            src={ artworkUrl100 }
            alt={ collectionName }
            artistName={ artistName }
            collectionName={ collectionName }
            nameId=""
            albumId=""
          />
        </Link>
      )));
  }

  checkAlbuns = () => {
    const { name, state: { artistAlbuns } } = this;
    if (artistAlbuns) {
      return (
        <>
          <h2>{`Resultado de álbuns de: ${name}`}</h2>
          { artistAlbuns.length > 0
            ? this.renderAlbuns()
            : <h3>Nenhum álbum foi encontrado</h3> }
        </>
      );
    }
  }

  render() {
    const { isLoading, disabled, artistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <input
          value={ artistName }
          type="text"
          data-testid="search-artist-input"
          onChange={ this.checkNameLength }
        />
        <Button
          disabled={ disabled }
          onClick={ this.handleSearch }
          testId="search-artist-button"
          text="Pesquisar"
        />
        { isLoading ? <Loading /> : this.checkAlbuns() }
      </div>
    );
  }
}

export default Search;
