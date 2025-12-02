import React from 'react';
import './styles/Hero.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Hero = () => (
  <section className="banner-section">
    <div className="container">
      <div className="row align-items-center">
        
        {/* Left Side: Textual Content */}
        <div className="col-lg-6 mb-4 mb-lg-0">
          {/* Headline */}
          <h1 className="banner-head">
            Reimagine what your business can be…
          </h1>
          
          {/* Tagline */}
          <p className="lead">
            Transforming waste into Value
          </p>

          {/* Subheadline */}
          <p className="lead">
            Transforming operations into high-performance systems, fast!
          </p>

          {/* Quote */}
          <blockquote className="banner-blockquote">
            “Waste elimination + Streamlined processes = Real Business Results”
          </blockquote>

          {/* Description of 3L Model */}
          <p className="banner-para">
            <strong>Beyond Lean</strong> guides teams to operational excellence by utilizing the
            <br /><strong>3L™ – Proprietary Model:</strong>
            <br />Lean Methodologies, Lean Leadership, and Lean Coaching — 
            <br />Connecting, Listening, and Traveling with you on your personal journey.
          </p>

          {/* Search + Buttons */}
          <div className="d-flex flex-column flex-md-row align-items-stretch gap-4">
            {/* <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Find your next course by skill"
              />
              <span className="input-group-text bg-primary text-white">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div> */}
            <button className="btn-book">Book a Consultation</button>
            <button className="btn-learn">Learn More</button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="col-lg-6 text-center">
          <img src="/assets/men.png" alt="Hero" className="img-fluid" />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;