import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import LeanModelSection from './components/LeanModelSection';
import About from './components/About';
import ServicesPage from './components/ServicesPage';
import LeanIntroSection from './components/LeanIntroSection';
import Resourcepage from './components/Resourcepage';
import Contact from './components/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Question from './components/Question';
import AuthModalManager from './components/AuthModalManager';
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import AddUserPage from './components/AddUserPage'; 
import ViewUsersPage from './components/ViewUsersPage';
import CategoryPage from './components/CategoryPage';
import QuestionPage from './components/QuestionPage'; 
import AddQuestionPage from './components/AddQuestionPage'
import EditQuestionPage from './components/EditQuestionPage';
import ViewQuestionPage from './components/ViewQuestionPage';
function Home({ onOpenAuthModal, onOpenSignIn }) {
  return (
    <>
      <Header />
      <Hero />
      <LeanModelSection />
        {/* <Dashboard /> */}
      <div id="about">
        <About />
      </div>
      <div id="servicesPage">
        <ServicesPage />
      </div>
      <div id="LeanIntroSection">
        <LeanIntroSection />
      </div>
      <div id="Resourcepage">
        <Resourcepage />
      </div>
      <div id="contact">
        <Contact />
      </div>

      {/* Sign in link */}
      {/* <p className="switch-link" onClick={onOpenSignIn}>
        Sign in
      </p> */}

      {/* This is your existing open button (optional now) */}
      {/* <button onClick={onOpenAuthModal} className="open-auth-button">
        Open Sign Up / Sign In
      </button> */}
    </>
  );
}

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <Router>
      <>
    {showAuthModal && (
  <AuthModalManager
    onClose={() => setShowAuthModal(false)}
    onOpenSignIn={() => {
      setShowAuthModal(false);
      setShowSignInModal(true);
    }}
  />
)}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onOpenAuthModal={() => setShowAuthModal(true)}
                onOpenSignIn={() => setShowSignInModal(true)}
              />
            }
          />
          <Route path="/question" element={<Question />} />
           <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/AddUserPage" element={<AddUserPage />} />
          <Route path="/users" element={<ViewUsersPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/questions" element={<QuestionPage />} />
           <Route path="/add-question" element={<AddQuestionPage />} />
          <Route path="/edit-question/:index" element={<EditQuestionPage />} />
          <Route path="/view-question/:index" element={<ViewQuestionPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
