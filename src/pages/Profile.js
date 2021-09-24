import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: null,
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

  renderUser = () => {
    const { user: { description, email, image, name } } = this.state;
    return (
      <section className="user">
        <img src={ image } alt={ name } data-testid="profile-image" />
        <Link to="profile/edit">Editar perfil</Link>
        <h2>{name}</h2>
        <h3>{email}</h3>
        <p>{description}</p>
      </section>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : this.renderUser() }
      </div>
    );
  }
}

export default Profile;
