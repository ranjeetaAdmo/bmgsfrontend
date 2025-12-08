// AddUserPage.js
import React, { useState, useContext, useEffect} from 'react';
import Sidebar from './Sidebar';
import Header from './Headerbs';
import { AuthContext } from "../context/AuthContext";
import './styles/AddUserPage.css';
import './styles/Dashboard.css';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddUserPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

const toggleSidebar = () => {
    if (!isMobile) {
      setIsCollapsed(prev => !prev);
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  const auth = useContext(AuthContext);
  useEffect(() => {

    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setIsCollapsed(true);
      } else {
        setIsMobile(false);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullname || !email || !password) {
      return setMessage("All fields are required");
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        { fullname, email, password },
        { 
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
         Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User created successfully!',
        timer: 2000,
        showConfirmButton: false,
      });
      setFullname('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response?.data?.message || "Registration failed",
      });
    }
  };

  return (
    <div className="dashboard-container">
     <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        <Header toggleSidebar={toggleSidebar} />

        <div className="add-user-wrapper">
          <div className="add-user-card">
            <h2 className="form-title">
              <FaArrowLeft
                className="back-icon"
                onClick={() => window.history.back()}
              />
              Add New User
            </h2>

            {message && <p className="form-message">{message}</p>}

            <form className="add-user-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <button type="submit" className="submit-btn">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
