import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const {
      src, alt, artistName, collectionName, nameId, albumId, className } = this.props;
    return (
      <section className={ className }>
        <img src={ src } alt={ alt } className="card-img" />
        <h3 data-testid={ nameId } className="card-title">{artistName}</h3>
        <h4 data-testid={ albumId } className="card-text">{collectionName}</h4>
      </section>
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
  className: PropTypes.string,
}.isRequired;

export default AlbumCard;
