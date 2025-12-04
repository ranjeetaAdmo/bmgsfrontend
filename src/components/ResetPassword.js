import React, { useState, useEffect } from "react";
import './styles/reset.css';

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get("email"));
    setToken(params.get("token"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_API_URL}/resetpassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token, newPassword })
    });

    const data = await res.json();
    setMsg(data.message || data.error);
  };

  return (
    <div className="reset-password">
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />

      <button type="submit">Reset</button>
      <p>{msg}</p>
    </form>
    </div>
  );
}

export default ResetPassword;
