import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './styles/Question.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Question = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/getQuestions')
      .then(res => res.json())
      .then(data => setAllQuestions(data))
      .catch(err => console.error('Failed to fetch questions:', err));
  }, []);

  const steps = [
    { num: 1, label: 'About You', active: stepIndex === 1 },
    { num: 2, label: 'Learning Goal', active: stepIndex === 2 },
    { num: 3, label: 'Current Knowledge', active: stepIndex === 3 },
    { num: 4, label: 'Learning Style', active: stepIndex === 4 },
  ];

  const questions = allQuestions.filter(q => q.category_name === selectedCategory);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.id);
  };

  const handleOptionChange = (questionIndex, selectedOption) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const goToNextStep = () => {
    setStepIndex(prev => Math.min(prev + 1, questions.length + 1));
  };

  const goToPreviousStep = () => {
    setStepIndex(prev => Math.max(prev - 1, 0));
  };

  // Add this import if you use axios
  // import axios from 'axios';

  // Replace with your actual user ID (from context, props, etc.)
  const user_id = 15; // Example: get from AuthContext or props

  const handleSubmitResponses = async () => {
    // Prepare responses array
    const responses = questions.map((q, idx) => ({
      question_id: q.id,
      selected_option: selectedOptions[idx + 1] // stepIndex starts from 1 for questions
    }));

    try {
      const res = await fetch('http://localhost:5000/api/saveResponse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, responses })
      });
      const data = await res.json();
      if (data.success) {
        alert('Responses saved successfully!');
        // Optionally, redirect or show a success message
      } else {
        alert(data.message || 'Failed to save responses');
      }
    } catch (err) {
      alert('Server error. Please try again later.');
    }
  };

  return (
    <>
      <Header />
      <section className='question-section'>
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-start py-5 question-block">
          <div className="step-wrapper w-100">
            {/* Step Navigation Header */}
            <div className="step-header d-flex justify-content-between align-items-center pb-3 mb-5">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`step-item text-center flex-fill ${step.active ? 'active-step' : ''}`}
                >
                  <div className="step-combined d-flex align-items-center justify-content-center gap-2">
                    <div className="step-circle d-flex align-items-center justify-content-center">
                      {step.num}
                    </div>
                    <div className={`step-label ${step.active ? 'fw-semibold' : ''}`}>
                      {step.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step 0: Category Selection */}
            {stepIndex === 0 && (
              <>
                <div className="card">
                  <h5 className="fw-bold mb-4">Please Select a Category</h5>
                  <form>
                    {categories.map(cat => (
                      <div className="form-check mb-3" key={cat.id}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="category"
                          id={cat.category_name}
                          onChange={handleCategoryChange}
                          checked={selectedCategory === cat.category_name}
                        />
                        <label className="form-check-label" htmlFor={cat.category_name}>
                          {cat.category_name}
                        </label>
                      </div>
                    ))}
                  </form>
                </div>

                {selectedCategory && (
                  <div className="d-flex justify-content-end mt-3">
                    <button type="button" className="nexted-button" onClick={goToNextStep}>
                      Next
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Steps 1-N: Questions for selected category */}
            {stepIndex > 0 && stepIndex <= questions.length && (
              <>
                <div className="card questiontool">
                  <div className="mb-4">
                    <div className="step-count-indicator">
                      {`${stepIndex}/${questions.length}`}
                    </div>
                  </div>
                  <h5 className="fw-bold mb-4">{questions[stepIndex - 1]?.question_text}</h5>

                  <form>
                    {["option1", "option2", "option3", "option4"].map((optKey, idx) => (
                      <div className="form-check mb-3" key={optKey}>
                        <input
                          type="radio"
                          className="form-check-input"
                          name={`q${stepIndex}`}
                          id={`opt${idx + 1}-${stepIndex}`}
                          checked={selectedOptions[stepIndex] === optKey}
                          onChange={() =>
                            setSelectedOptions(prev => ({
                              ...prev,
                              [stepIndex]: optKey
                            }))
                          }
                        />
                        <label className="form-check-label" htmlFor={`opt${idx + 1}-${stepIndex}`}>
                          {questions[stepIndex - 1]?.[optKey]}
                        </label>
                      </div>
                    ))}
                  </form>
                </div>

                <div className="button-wrapper">
                  <button type="button" className="go-back" onClick={goToPreviousStep}>
                    Go Back
                  </button>
                  <button type="button" className="next-button" onClick={goToNextStep}>
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Final Step: Video + Text + Get Started Button */}
            {stepIndex === questions.length + 1 && (
              <>
                <div className="final-step">
                  <h3>
                    <h3>
                      <span style={{ cursor: 'pointer', userSelect: 'none' }} onClick={goToPreviousStep} >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </span>{" "}
                      Lean Manufacturing - Principles and Implementation
                    </h3>
                  </h3>

                  <video width="100%" controls style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "cover",
                    marginTop: "20px"
                  }}>
                    <source src="/assets/0_Student_Girl_3840x2160.mp4" type="video/mp4" />
                    Your browser does not support HTML video.
                  </video>

                  <p className="mt-4 text-start video-text">
                    BGMS is designed to simplify and organize school and student management
                    by bringing everything into one seamless digital system. From attendance
                    tracking to student performance, the platform helps institutions operate
                    faster, smarter, and more efficiently.Whether you're an admin, teacher, or student, BGMS ensures easy access,
                    better communication, and a smooth user experience anytime and anywhere.
                    The future of smart school management begins here.

                  </p>
                  <p className="mt-4 text-start video-text">
                    The platform supports features like attendance tracking, fee management,
                    digital assignments, communication tools, report generation, and
                    much more—all in one place. With an intuitive and user-friendly UI,
                    BGMS makes daily operations faster, more organized, and stress-free
                    for teachers, students, and administrators.
                  </p>
                </div>
                <button type="button" className="get-started-button mt-4" onClick={handleSubmitResponses}>
                  Submit Responses
                </button>
              </>
            )}

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Question;
