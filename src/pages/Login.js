import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      disabled: true,
      userName: '',
      isRedirect: false,
    };
  }

  checkNameLength = ({ target: { value } }) => {
    const minimunNameLength = 3;
    if (value.length >= minimunNameLength) {
      this.setState({ disabled: false, userName: value });
    }
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });
    const { userName } = this.state;
    createUser({ name: userName })
      .then(() => {
        this.setState({
          isLoading: false,
          isRedirect: true,
        });
      });
  }

  renderForm = () => {
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
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }

  render() {
    const { isLoading, isRedirect } = this.state;

    if (isLoading) return <Loading />;

    if (isRedirect) return <Redirect to="/search" />;

    return (
      this.renderForm()
    );
  }
}

export default Login;
