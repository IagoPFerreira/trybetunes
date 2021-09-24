import React, { Component } from 'react';
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

  render() {
    const { isLoading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : console.log(user) }
      </div>
    );
  }
}

export default Profile;
