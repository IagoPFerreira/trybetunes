import React, { Component } from 'react';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      disabled: true,
      artistName: null,
      artistAlbuns: null,
    };

    this.name = '';
  }

  checkNameLength = ({ target: { value } }) => {
    const minimunNameLength = 2;
    if (value.length >= minimunNameLength) {
      const artistName = value.split(' ')
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(' ');
      this.setState({ disabled: false, artistName });
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
      this.setState({
        artistName: null,
      });
    });
  }

  renderAlbuns = () => {
    const { name, state: { artistAlbuns } } = this;
    if (artistAlbuns) {
      return (
        <>
          <h2>{`Resultado de álbuns de: ${name}`}</h2>
          { artistAlbuns.map(() => (
            ''
          ))}
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
        { isLoading ? <Loading /> : this.renderAlbuns() }
      </div>
    );
  }
}

export default Search;
