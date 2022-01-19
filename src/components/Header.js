import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: '',
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({ isLoading: false, user });
    });
  }

  renderHeader = () => {
    const { user } = this.state;
    return (
      <>
        <h1 data-testid="header-user-name" className="user-name">{user.name}</h1>
        <nav className="navbar">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="nav-link"
          >
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="nav-link"
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="nav-link"
          >
            Profile
          </Link>
        </nav>
      </>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <header data-testid="header-component" className="header-component">
        { isLoading ? <Loading /> : this.renderHeader() }
      </header>
    );
  }
}

export default Header;
