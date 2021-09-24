import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: null,
      disabled: true,
    };
  }

  componentDidMount() {
    getUser().then((result) => {
      this.setState({
        isLoading: false,
        user: result,
      });
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  renderForm = () => {
    const { user: { description, email, image, name }, disabled } = this.state;

    return (
      <form>
        <img src={ image } alt={ name } />
        <label htmlFor="user-image">
          <input
            id="user-image"
            type="text"
            name="image"
            data-testid="edit-input-image"
            value={ image }
          />
        </label>
        <label htmlFor="user-name">
          Nome
          <h4>Fique a vontade para usar seu nome social</h4>
          <input
            id="user-name"
            name="name"
            data-testid="edit-input-name"
            onChange={ this.handleChange }
            value={ name }
            placeholder="Exemplo Exemplo"
          />
        </label>
        <label htmlFor="user-email">
          Email
          <h4>Escolha um e-mail que você consulte diariamente</h4>
          <input
            id="user-email"
            name="email"
            data-testid="edit-input-email"
            onChange={ this.handleChange }
            value={ email }
            placeholder="Exemplo Exemplo"
          />
        </label>
        <label htmlFor="user-description">
          Descrição
          <textarea
            id="user-description"
            name="description"
            data-testid="edit-input-description"
            onChange={ this.handleChange }
            value={ description }
            placeholder="Exemplo Exemplo"
          />
        </label>
        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={ disabled }
        >
          Salvar
        </button>
      </form>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading /> : this.renderForm() }
      </div>
    );
  }
}

export default ProfileEdit;
