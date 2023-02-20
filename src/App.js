import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/Search" component={ Search } />
        <Route exact path="/Album/:id" component={ Album } />
        <Route exact path="/Favorites" component={ Favorites } />
        <Route exact path="/Profile" component={ Profile } />
        <Route exact path="/Profile/Edit" component={ ProfileEdit } />
        <Route exact path="" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
