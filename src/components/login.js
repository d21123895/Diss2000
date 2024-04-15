// LoginPage.js
import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Check if username and password are provided
    if (!username || !password) {
      setError('Please provide both username and password');
      return;
    }

    // Call onLogin function with entered username and password
    onLogin(username, password);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <h2>Login to SO Sort</h2>
      
      {error && <p className="error-message">{error}</p>}
      <div></div>  
      <input
        className="login-input"
        type="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div></div>  
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div></div>  
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
