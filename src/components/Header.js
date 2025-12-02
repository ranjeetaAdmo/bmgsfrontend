import { useState, useEffect, useRef } from 'react';
import './styles/Header.css';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="header" ref={menuRef}>
        <div className="logo">LOGO</div>

        {/* Hamburger icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="" onClick={() => setMenuOpen(false)}>HOME</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>ABOUT US</a></li>
          <li><a href="#servicesPage" onClick={() => setMenuOpen(false)}>SERVICES</a></li>
          <li><a href="#LeanIntroSection" onClick={() => setMenuOpen(false)}>METHODOLOGY</a></li>
          <li><a href="#Resourcepage" onClick={() => setMenuOpen(false)}>RESOURCES</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT US</a></li>

          {/* Mobile buttons */}
          <li className="mobile-buttons">
            <button
              className="btn-outline"
              onClick={() => {
                setShowModal(true);
                setMenuOpen(false);
              }}
            >
              Sign In
            </button>
            <button
              className="btn-filled"
              onClick={() => {
                setShowSignUp(true);
                setMenuOpen(false);
              }}
            >
              Sign Up
            </button>
          </li>
        </ul>

        {/* Desktop buttons */}
        <div className="nav-buttons">
          <button className="btn-outline" onClick={() => setShowModal(true)}>Sign In</button>
          <button className="btn-filled" onClick={() => setShowSignUp(true)}>Sign Up</button>
        </div>
      </header>

      {showModal && (
        <SignInModal onClose={() => setShowModal(false)} />
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
