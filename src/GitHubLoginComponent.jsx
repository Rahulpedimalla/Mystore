// GitHubLoginComponent.jsx
import React, { useState } from 'react';

function GitHubLoginComponent(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const clientId = 'Ov23liVslqCzBzsEcQai'; // Replace with your GitHub Client ID
    const redirectUri = 'http://localhost:5173/callback'; // Your redirect URI

    const handleLogin = () => {
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;
        window.location.href = githubAuthUrl;
    };

    return (
        <>
            {!isLoggedIn ? (
                <button onClick={handleLogin}>Login with GitHub</button>
            ) : (
                <h2>Welcome, {userName}!</h2>
            )}
        </>
    );
};

export default GitHubLoginComponent;
