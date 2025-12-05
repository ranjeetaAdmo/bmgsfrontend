// ForgotPassword.js
import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    const res = await fetch(`${process.env.REACT_APP_API_URL}/forgetpassword`, {
      withCredentials: true,
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    setMsg(data.message || data.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
      <div>{msg}</div>
    </form>
  );
}

export default ForgotPassword;