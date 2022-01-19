import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Button from '../components/Button';
import checkKey from '../services/checkKey';
import logo from '../images/music.png';

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
      <section data-testid="page-login" className="login-area">
        <img
          src={ logo }
          alt="Nota musical colorida dentro de um círculo branco"
          className="logo"
        />
        <input
          data-testid="login-name-input"
          onChange={ this.checkNameLength }
          onKeyDown={ (e) => checkKey(e, this.handleClick) }
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
