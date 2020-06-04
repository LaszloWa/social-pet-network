import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import WelcomePage from './pages/welcome/welcome.component';
import SignInPage from './components/sign-in/sign-in.component';
import SignUpPage from './components/sign-up/sign-up.component';

import PublicProfilePage from './pages/public-profile/public-profile.component';
import PrivateProfilePage from './pages/private-profile/private-profile.component';

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
            setCurrentUser(res[0]);
          })
      } else {
        setCurrentUser(userAuth);
      }

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
        <Route exact path="/" 
          render={() => currentUser ? <h1>Newsfeed to come</h1> : <WelcomePage />} 
        />
        {
          //TODO: Implement newsfeed component
        }
        <Route exact path="/profile" render={() => currentUser ? <PrivateProfilePage currentUser={currentUser} /> : <SignInPage /> } />
        <Route path={`/profile:${currentUser}`} component={PublicProfilePage} /> 
        {//TODO: update currentUser variable to point to displayName
        }
        <Route path="/signin" render={() => currentUser ? <Redirect to="/" /> : <SignInPage />} />
        <Route path="/signup" render={() => currentUser ? <Redirect to="/" /> : <SignUpPage />} />
      </Switch>
    </div>
  );
}

export default App;
