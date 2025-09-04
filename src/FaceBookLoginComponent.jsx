// FacebookLoginComponent.jsx
import React, { useState } from 'react';

function FacebookLoginComponent(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const initializeFacebookSDK = () => {
        if (!window.FB) {
            window.fbAsyncInit = () => {
                window.FB.init({
                    appId: '1616955219237522', // Replace with your Facebook App ID
                    cookie: true,
                    xfbml: true,
                    version: 'v12.0'
                });
            };

            // Load the SDK script dynamically
            const script = document.createElement('script');
            script.src = "https://connect.facebook.net/en_US/sdk.js";
            script.async = true;
            document.body.appendChild(script);
        }
    };

    const handleLogin = () => {
        if (window.FB) {
            window.FB.login(response => {
                if (response.status === 'connected') {
                    // User logged in, fetch their data
                    window.FB.api('/me', { fields: 'name,email' }, userInfo => {
                        setIsLoggedIn(true);
                        setUserName(userInfo.name);
                    });
                } else {
                    console.error('Facebook login failed');
                }
            }, { scope: 'public_profile,email' });
        }
    };

    // Initialize the Facebook SDK on render
    initializeFacebookSDK();

    return (
        <div>
            {isLoggedIn ? (
                <h2>Welcome, {userName}</h2>
            ) : (
                <button onClick={handleLogin}>Login with Facebook</button>
            )}
        </div>
    );
};

export default FacebookLoginComponent;
