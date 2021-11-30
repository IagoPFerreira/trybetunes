import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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

  // handleFavorite = ({ target: { checked } }) => {
  //   this.setState({ checked });

  //   return this.handleSong();
  // }

  renderTrack = () => {
    const {
      props: { music: { trackName, previewUrl, trackId } },
      state: { checked },
    } = this;

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
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackName }>
          Favorita
          <input
            type="checkbox"
            id={ trackName }
            onChange={ (event) => (!checked
              ? this.handleSong(event, addSong)
              : this.handleSong(event, removeSong)) }
            checked={ checked }
          />
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
