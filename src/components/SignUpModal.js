// SignUpModal.jsx
import './styles/SignUpModal.css';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useState ,useContext} from 'react';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

const SignUpModal = ({ onClose, onSwitchToSignIn }) => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setUser } = useContext(AuthContext);
  const handleSignUpClick = async () => {
    if (!fullname || !email || !password || !confirmPassword) {
      return setMessage("All fields are required");
    }
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        { fullname, email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      localStorage.setItem('token', res.data.user.token);
      console.log(res.data);
      navigate('/question'); // redirect after successful signup
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <IoClose size={24} />
        </button>

        <h2 className="modal-title">Sign up</h2>

        {message && <p className="error-message">{message}</p>}

        <div className="form-group">
          <label htmlFor="name">NAME</label>
          <input id="name" type="text" value={fullname} onChange={e => setFullname(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
          <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>

        <button className="btn-signup" onClick={handleSignUpClick}>Sign up</button>

        <p className="switch-link" onClick={onSwitchToSignIn}>Sign in</p>

        <p className="terms">
          By clicking continue above, you acknowledge that you have read, understood and agree to our <span>Terms & Conditions.</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
