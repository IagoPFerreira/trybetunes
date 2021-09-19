import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }

  handleAddSong = () => {
    this.setState({ isLoading: true });
    const { music } = this.props;
    addSong(music).then(() => this.setState({ isLoading: false }));
  }

  handleFavorite = ({ target: { checked } }) => {
    const { music } = this.props;
    return checked ? this.handleAddSong() : removeSong(music);
  }

  renderTrack = () => {
    const { music: { trackName, previewUrl, trackId }, index } = this.props;
    return (
      <div>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>
            audio
          </code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ index }>
          <input type="checkbox" id={ index } onClick={ this.handleFavorite } />
        </label>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (isLoading ? <Loading /> : this.renderTrack());
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
