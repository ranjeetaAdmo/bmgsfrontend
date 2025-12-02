
import React from 'react';
import './styles/LeanModelSection.css';
import { FaCheckCircle } from 'react-icons/fa'; // Optional FontAwesome-style icons

const LeanModelSection = () => {
  return (
    <section className="lean-model-section py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center text-center mb-4">
          <div className="col-lg-12">
            <h2 className="BMGS-head">
              BMGS presents <span className="">Beyond Lean – 3L*</span>
            </h2>
            <p className="BMGS-text">
              Proprietary Model Become the next expert!
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-12">
            <ul className="list-unstyled fs-5 text-start">
              <li className="mb-3">
                <FaCheckCircle className="text-success me-2" />
                Master the core principles of Lean to reduce Lead Time, while optimizing productivity and efficiency.
              </li>
              <li className="mb-3">
                <FaCheckCircle className="text-success me-2" />
                Learn practical problem-solving methods and techniques that drive continuous improvement.
              </li>
              <li className="mb-3">
                <FaCheckCircle className="text-success me-2" />
                Discover real-world applications through interactive, hands-on learning modules.
              </li>
              <li className="mb-3">
                <FaCheckCircle className="text-success me-2" />
                Gain insights into waste reduction and value creation for modern industries.
              </li>
              <li className="mb-3">
                <FaCheckCircle className="text-success me-2" />
                Build a solid foundation for a thriving career in manufacturing and beyond.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeanModelSection;