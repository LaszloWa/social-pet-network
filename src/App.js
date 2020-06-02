import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/header/header.component';
import PublicProfilePage from './pages/public-profile/public-profile.component';
import PrivateProfilePage from './pages/private-profile/private-profile.component';
import SignInPage from './pages/sign-in/sign-in.component';
import SignUpPage from './pages/sign-up/sign-up.component';

import { auth } from './firebase/firebase.utils';
import client from './sanity/sanity.utils';

import CurrentUserContext from './contexts/current-user/current-user.context';

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    client.fetch('*[_type == "user"]').then(res => console.log(res))
    let unsubscribe = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        client.fetch(`*[_type == "user" && userId == "${userAuth.uid}"]`)
          .then(res => {
            setCurrentUser(res);
            console.log(res)
          })
       // console.log(userAuth)
      }

      setCurrentUser(userAuth);
    })

    return () => {
      unsubscribe();
    }
  }, [])

  useEffect(() => {
    console.log('current user: ', currentUser)
  }, [currentUser])

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
      </CurrentUserContext.Provider>
      <Switch>
        <Route path="/profile" component={PrivateProfilePage} />
        <Route path={`/profile:${currentUser}`} component={PublicProfilePage} /> //TODO: update currentUser variable to point to displayName
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
