import React, { Component } from 'react';
import PropTypes from 'prop-types';
import notFound from '../images/not-found.png';

class NotFound extends Component {
  render() {
    const { history } = this.props;
    const timer = 4000;
    setTimeout(() => {
      history.push('/trybetunes/search');
    }, timer);
    return (
      <div data-testid="page-not-found" className="not-found-page">
        <img src={ notFound } alt="404, not found" />
        <p>Esta página será redirecionada para a página de pesquisa</p>
      </div>
    );
  }
}

NotFound.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default NotFound;
