import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import defaulImage from '../images/blankProfilePicture.jpg';

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
      <section className="user-infos">
        <img
          src={ image || defaulImage }
          alt={ name }
          data-testid="profile-image"
          className="user-image"
        />
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
      <section data-testid="page-profile" className="page-profile page">
        <Header />
        { isLoading ? <Loading /> : this.renderUser() }
      </section>
    );
  }
}

export default Profile;
