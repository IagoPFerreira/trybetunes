import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Album from '../components/Album';
import Favorites from '../components/Favorites';
import Login from '../components/Login';
import Search from '../components/Search';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          {/* <Route path="/profile/edit" component={ ProfileEdit } /> */}
          {/* <Route path="/profile" component={ Profile } /> */}
          {/* <Route path="*" component={ NotFound } /> */}
        </Switch>
      </div>
    );
  }
}

export default Routes;
