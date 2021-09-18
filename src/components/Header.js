import React, { Component } from 'react';
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

  render() {
    const { isLoading, user } = this.state;
    return (
      <div data-testid="header-component">
        { isLoading ? <Loading /> : <h1 data-testid="header-user-name">{user.name}</h1> }
      </div>
    );
  }
}

export default Header;
