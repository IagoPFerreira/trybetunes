import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { disabled, onClick, testId, text } = this.props;
    return (
      <button
        type="button"
        disabled={ disabled }
        data-testid={ testId }
        onClick={ onClick }
        className="button"
      >
        { text }
      </button>
    );
  }
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  testId: PropTypes.string,
  text: PropTypes.string,
}.isRequired;

export default Button;
