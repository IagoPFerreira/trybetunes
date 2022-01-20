import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import redHeart from '../images/redHeart.png';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.checkLocalStorage();
  }

  checkLocalStorage = () => {
    const checkStorage = JSON.parse(localStorage.getItem('favorite_songs'));
    const { music: { trackName } } = this.props;
    const some = checkStorage.some((item) => item.trackName === trackName);

    this.setState({ checked: some });
  }

  handleSong = ({ target }, callback) => {
    this.setState({ isLoading: true, checked: target.checked });

    const { props: { music, onChange } } = this;

    if (onChange) {
      onChange();
    }

    callback(music).then(() => this.setState({ isLoading: false }));
  }

  renderTrack = () => {
    const {
      props: { music: { trackName, previewUrl, trackId, collectionName }, image },
      state: { checked },
    } = this;
    return (
      <section className="song-card">
        <img src={ image } alt={ collectionName } className="card-img" />
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
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackName }>
          <img
            src={ checked ? redHeart : whiteHeartIcon }
            alt="set favorite"
            className="heart-icon"
          />
          <input
            type="checkbox"
            id={ trackName }
            onChange={ (event) => (!checked
              ? this.handleSong(event, addSong)
              : this.handleSong(event, removeSong)) }
            checked={ checked }
            hidden
          />
        </label>
      </section>
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
