import './styles/SignInModal.css';
import React, { useState,useContext  } from 'react';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5'; 

const SignInModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  
  const handleSignUpClick = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post('http://148.230.92.191:5000/api/login',
     {email,password},
     { withCredentials: true }
    );
    setMessage("Login successful!");
    setUser(res.data.user);
    console.log(res.data.user.role);
    if(res.data.user.role === 'admin') {
      navigate('/dashboard');
      return;
    }
    if(res.data.user.role === 'user'){
       navigate('/question');
    }
  } catch (err) {
    setMessage(err.response?.data?.msg || 'Login failed');
  }
  
};
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <IoClose size={24} />
        </button>

        <h2 className="modal-title">Sign in</h2>
         <form className="login-form" onSubmit={handleSignUpClick}>
        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input  type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>

        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input  type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>

        <button className="btn-signin">Sign in</button>
        </form>

        <p className="forgot-link">Forgot your password?</p>

        <p className="terms">
          By clicking continue above, you acknowledge that you have read,
          understood and agree to our <span>Terms & Conditions.</span>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;

