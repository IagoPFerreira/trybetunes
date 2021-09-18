import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  componentDidMount() {
    getUser();
  }

  render() {
    return (
      <div data-testid="header-component" />
    );
  }
}

export default Header;
