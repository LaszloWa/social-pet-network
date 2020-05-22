import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/header/header.component';
import PublicProfilePage from './pages/public-profile/public-profile.component';
import PrivateProfilePage from './pages/private-profile/private-profile.component';

import './App.css';

function App() {
  const userName = 'Bob';

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/profile" component={PrivateProfilePage} />
        <Route path={`/profile:${userName}`} component={PublicProfilePage} />
      </Switch>
    </div>
  );
}

export default App;
