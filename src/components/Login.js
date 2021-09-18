import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
    };
  }

  checkNameLength = ({ target: { value } }) => {
    const minimunNameLength = 3;
    if (value.length >= minimunNameLength) {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          onChange={ this.checkNameLength }
        />
        <button
          type="button"
          disabled={ disabled }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
