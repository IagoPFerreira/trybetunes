import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import defaulImage from '../images/blankProfilePicture.jpg';
import Button from '../components/Button';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      description: '',
      email: '',
      image: '',
      name: '',
      disabled: true,
    };
  }

  componentDidMount() {
    getUser().then(({ description, email, image, name }) => {
      const regex = /\S+@\S+\.\S+/;
      const isNameEmail = regex.test(name);
      this.setState({
        isLoading: false,
        description,
        email: !isNameEmail ? email : name,
        image,
        name: isNameEmail ? '' : name,
      });
    });
  }

  componentDidUpdate() {
    const { disabled } = this.state;
    if (disabled) {
      this.ableButton();
    }
  }

  ableButton = () => {
    const { description, email, image, name } = this.state;
    const regex = /\S+@\S+\.\S+/;

    if (description && regex.test(email) && image && name) {
      this.setState({ disabled: false });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });

    this.ableButton();
  }

  handleClick = (event) => {
    event.preventDefault();

    const { history } = this.props;

    const { description, email, image, name } = this.state;

    updateUser({ description, email, image, name });

    history.push('/trybetunes/profile');
  }

  renderForm = () => {
    const { description, email, image, name, disabled } = this.state;

    return (
      <form className="user-form">
        <img src={ image || defaulImage } alt={ name } className="user-image" />
        <fieldset className="labels-container">
          <label htmlFor="user-image">
            Imagem
            <input
              id="user-image"
              type="text"
              name="image"
              data-testid="edit-input-image"
              onChange={ this.handleChange }
              value={ image }
              placeholder="Url para sua foto de perfil"
              className="form-field"
            />
          </label>
          <label htmlFor="user-name">
            Nome
            <input
              id="user-name"
              name="name"
              data-testid="edit-input-name"
              onChange={ this.handleChange }
              value={ name }
              placeholder="Exemplo Exemplo"
              className="form-field"
            />
          </label>
          <label htmlFor="user-email">
            Email
            <input
              id="user-email"
              name="email"
              data-testid="edit-input-email"
              onChange={ this.handleChange }
              value={ email }
              placeholder="exemplo@exemplo.com"
              className="form-field"
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
              className="form-field"
            />
          </label>
        </fieldset>
        <Button
          disabled={ disabled }
          onClick={ this.handleClick }
          testId="edit-button-save"
          text="Salvar"
        />
      </form>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <section data-testid="page-profile-edit" className="page-profile-edit page">
        <Header />
        { isLoading ? <Loading /> : this.renderForm() }
      </section>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default ProfileEdit;
