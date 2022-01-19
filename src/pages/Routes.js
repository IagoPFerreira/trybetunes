import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Album from './Album';
import Favorites from './Favorites';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Search from './Search';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/trybetunes/" component={ Login } />
        <Route path="/trybetunes/search" component={ Search } />
        <Route path="/trybetunes/album/:id" component={ Album } />
        <Route path="/trybetunes/favorites" component={ Favorites } />
        <Route path="/trybetunes/profile/edit" component={ ProfileEdit } />
        <Route path="/trybetunes/profile" component={ Profile } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default Routes;
