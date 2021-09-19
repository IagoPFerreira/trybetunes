import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  renderMusics = () => {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((results) => {
      console.log(results);
    });
    return (<>Oi</>);
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
