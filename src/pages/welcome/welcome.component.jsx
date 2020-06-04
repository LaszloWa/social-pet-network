import React from 'react';

import SignInPage from '../../components/sign-in/sign-in.component';

import './welcome.styles.scss';

const WelcomePage = () => (
    <div>
        <h1>Welcome to the Social Pet App</h1>
        <SignInPage />
    </div>
);

export default WelcomePage;