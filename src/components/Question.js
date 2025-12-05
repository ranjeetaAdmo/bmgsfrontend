import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './styles/Question.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
const Question = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/categories`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("RAW CATEGORY API RESPONSE:", data);

        // ---- FIX: Always convert response into array ----
        if (Array.isArray(data)) {
          setCategories(data);
        }
        else if (data && Array.isArray(data.data)) {
          setCategories(data.data);
        }
        else {
          console.error("Invalid categories response format:", data);
          setCategories([]); // Avoid crash
        }
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/getQuestions`, {
      method: "GET",
      credentials: "include",   // <-- REQUIRED to send cookies
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("API Question Data:", data);
        setAllQuestions(Array.isArray(data) ? data : data.data || []);
      })
      .catch(err => console.error('Failed to fetch questions:', err));
  }, []);
  const steps = [
    { num: 1, label: 'About You', active: stepIndex === 1 },
    { num: 2, label: 'Learning Goal', active: stepIndex === 2 },
    { num: 3, label: 'Current Knowledge', active: stepIndex === 3 },
    { num: 4, label: 'Learning Style', active: stepIndex === 4 },
  ];

  const questions = Array.isArray(allQuestions)
    ? allQuestions.filter(q => q.category_name === selectedCategory)
    : [];
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


  const handleSubmitResponses = async () => {
    // Prepare responses array
    const responses = questions.map((q, idx) => ({
      question_id: q.id,
      selected_option: selectedOptions[idx + 1] // stepIndex starts from 1 for questions
    }));

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.REACT_APP_API_URL}/saveResponse`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ responses }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Responses saved successfully!',
          confirmButtonColor: '#3085d6',
        });
        // Optionally, redirect or show a success message
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message || 'Failed to save responses',
          confirmButtonColor: '#d33',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Please try again later.',
        confirmButtonColor: '#d33',
      });
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
                  {/* If last step → show Submit */}
                  {stepIndex === questions.length && (
                    <button
                      type="button"
                      className="next-button"
                      onClick={handleSubmitResponses}
                    >
                      Submit Responses
                    </button>
                  )}
                </div>
              </>
            )}

            {/* Final Step: Video + Text + Get Started Button */}
            {stepIndex === questions.length + 1 && (
              <>
                <div className="final-step">
                  <h3>
                    <span style={{ cursor: 'pointer', userSelect: 'none' }} onClick={goToPreviousStep} >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </span>{" "}
                    Lean Manufacturing - Principles and Implementation
                  </h3>

                  <video width="100%" controls style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "cover",
                    marginTop: "20px"
                  }}>
                    <source src="/assets/video.mp4" type="video/mp4" />
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
                <div className="Started-button my-4">
                  <button
                    type="button"
                    className="get-started-button mt-4"
                    onClick={handleSubmitResponses}
                  >
                    Submit Responses
                  </button>
                  <a href="https://www.udemy.com/?deal_code=UDEAFNULP0324&utm_term=Homepage&utm_content=Textlink&utm_campaign=NewUserLP0324&utm_source=aff-campaign&utm_medium=udemyads&LSNPUBID=znpz0s2okgU&ranMID=47901&ranEAID=znpz0s2okgU&ranSiteID=znpz0s2okgU-XUTy3qk39nuPg.jt5BDggA&gad_source=1&gad_campaignid=22498850779&gbraid=0AAAAApkvLA7sfwOp_ixIM00NTL66aqfT_&gclid=Cj0KCQjwotDBBhCQARIsAG5pinOlM7T_A1W787l3j0CP50k_Vkx5l8ilDeoRqOFrP6EHArbeIMTWQvwaAhvFEALw_wcB"
                    target="_blank">
                    <button type="button" class="get-started-button mt-4">Get Started
                    </button>
                  </a>
                </div>
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
