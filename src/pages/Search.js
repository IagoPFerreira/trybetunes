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
      artistName: '',
    };
  }

  checkNameLength = ({ target: { value } }) => {
    const minimunNameLength = 2;
    if (value.length >= minimunNameLength) {
      const artistName = value.split(' ')
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(' ');
      this.setState({ disabled: false, artistName });
    }
  }

  handleSearch = () => {
    const { artistName } = this.state;
    this.setState({ isLoading: true });
    console.log(artistName);
    searchAlbumsAPI(artistName).then(() => {
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { isLoading, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
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
        { isLoading ? <Loading /> : <p>Opa</p> }
      </div>
    );
  }
}

export default Search;
