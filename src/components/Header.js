import { useState } from 'react';
import './styles/Header.css';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      <header className="header">
        <div className="logo"></div>

        <ul className="nav-links">
          <li><a href="">HOME</a></li>
          <li><a href="#about">ABOUT US</a></li>
          <li><a href="#servicesPage">SERVICES</a></li>
          <li><a href="#LeanIntroSection">METHODOLOGY</a></li>
          <li><a href="#Resourcepage">RESOURCES</a></li>
          <li><a href="#contact">CONTACT US</a></li>
        </ul>

        <div className="nav-buttons">
          <button className="btn-outline" onClick={() => setShowModal(true)}>Sign In</button>
          <button className="btn-filled" onClick={() => setShowSignUp(true)}>Sign Up</button>
        </div>
      </header>

      {showModal && (
        <SignInModal
          onClose={() => setShowModal(false)}
        />
      )}

      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onSwitchToSignIn={() => {
            setShowSignUp(false);
            setShowModal(true);
          }}
        />
      )}
    </>
  );
};

export default Header;
