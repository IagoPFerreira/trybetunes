import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
    };
  }

  checkNameLength = ({ target: { value } }) => {
    const minimunNameLength = 2;
    if (value.length >= minimunNameLength) {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.checkNameLength }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
