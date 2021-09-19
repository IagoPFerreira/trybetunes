import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { src, alt, artistName, collectionName, nameId, albumId } = this.props;
    return (
      <>
        <img src={ src } alt={ alt } />
        <h3 data-testid={ nameId }>{artistName}</h3>
        <h4 data-testid={ albumId }>{collectionName}</h4>
      </>
    );
  }
}

AlbumCard.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  nameId: PropTypes.string,
  albumId: PropTypes.string,
}.isRequired;

export default AlbumCard;
