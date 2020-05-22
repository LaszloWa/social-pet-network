import React from 'react';

import ProfilePic from '../../components/profile-pic/profile-pic.component';

import './public-profile.styles.scss';

const PublicProfilePage = () => {
   return (
        <div>
            <div className="profile-pic">
                <ProfilePic height={200} width={200} />
            </div>
            <div className="profile-header">
                <h2 className="profile-name">Name Placeholder</h2>
                <p className="profile-description">Short descriptive text</p>
            </div>
            <div className="about-me-section">
                <h3>About me</h3>
                <table className="about-me-table">
                    <tr className="about-me">
                        <p>Age: </p>
                        <p>Gender: </p>
                        <p>Breed: </p>
                        <p>Hobbies: </p>
                        <p>Nickname(s): </p>
                    </tr>
                    <tr className="about-me">
                        <p>TO COME</p>
                        <p>TO COME</p>
                        <p>TO COME</p>
                        <p>TO COME</p>
                        <p>TO COME</p>
                    </tr>
                </table>
            </div>
            <div className="recent-posts">
                {
                //TODO: add wall post component
                }
            </div>
        </div>
    )
};

export default PublicProfilePage;