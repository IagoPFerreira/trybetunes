import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
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

  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
      </div>
    );
  }
}

export default ProfileEdit;
