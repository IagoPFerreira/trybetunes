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
      <header>
        <h1 data-testid="header-user-name">{user.name}</h1>
        <Link to="/search" data-testid="link-to-search" />
      </header>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="header-component">
        { isLoading ? <Loading /> : this.renderHeader() }
      </div>
    );
  }
}

export default Header;
