import React, { useState } from 'react';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';

const AuthModalManager = ({ onClose }) => {
  const [showSignUp, setShowSignUp] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);

  const switchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  return (
    <>
      {showSignUp && (
        <SignUpModal onClose={onClose} onOpenSignIn={switchToSignIn} />
      )}
      {showSignIn && (
        <SignInModal onClose={onClose} onOpenSignUp={switchToSignUp} />
      )}
    </>
  );
};

export default AuthModalManager;
