import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Button from '../components/Button';

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

  checkKey = ({ keyCode }) => {
    const enterKeyCode = 13;
    if (keyCode === enterKeyCode) this.handleClick();
  }

  renderForm = () => {
    const { disabled } = this.state;
    return (
      <section data-testid="page-login" className="login-area">
        <input
          data-testid="login-name-input"
          onChange={ this.checkNameLength }
          onKeyDown={ this.checkKey }
          className="email-input"
          id="email-input"
          placeholder="exemplo@exemplo.com"
        />
        <Button
          disabled={ disabled }
          onClick={ this.handleClick }
          testId="login-submit-button"
          text="Entrar"
        />
      </section>
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
