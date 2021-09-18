import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      userName: '',
    };
  }

  checkNameLength = ({ target: { value } }) => {
    const minimunNameLength = 3;
    if (value.length >= minimunNameLength) {
      this.setState({ disabled: false, userName: value });
    }
  }

  render() {
    const { disabled, userName } = this.state;
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
          onClick={ () => createUser({ name: userName }) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
