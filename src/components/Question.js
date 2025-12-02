import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './styles/Question.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Question = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stepIndex, setStepIndex] = useState(0); // 0 = category

  const steps = [
    { num: 1, label: 'About You', active: stepIndex === 1 },
    { num: 2, label: 'Learning Goal', active: stepIndex === 2 },
    { num: 3, label: 'Current Knowledge', active: stepIndex === 3 },
    { num: 4, label: 'Learning Style', active: stepIndex === 4 },
  ];

  const questions = [
    {
      title: 'What is your current level of understanding of Lean Tools?',
      step: '1/3',
    },
    {
      title: 'What is your current level of understanding of Lean Principles?',
      step: '2/3',
    },
    {
      title: 'What is your current level of understanding of VSM?',
      step: '3/3',
    },
  ];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.id);
  };

  const goToNextStep = () => {
    setStepIndex(prev => Math.min(prev + 1, questions.length + 1));
  };

  const goToPreviousStep = () => {
    setStepIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <>
      <Header />
      <div className="container-fluid  min-vh-100 d-flex justify-content-center align-items-start py-5 question-block">
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
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category"
                      id="tools"
                      onChange={handleCategoryChange}
                      checked={selectedCategory === 'tools'}
                    />
                    <label className="form-check-label" htmlFor="tools">Methodologies</label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category"
                      id="leadership"
                      onChange={handleCategoryChange}
                      checked={selectedCategory === 'leadership'}
                    />
                    <label className="form-check-label" htmlFor="leadership">Leadership</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category"
                      id="training"
                      onChange={handleCategoryChange}
                      checked={selectedCategory === 'training'}
                    />
                    <label className="form-check-label" htmlFor="training">Coaching</label>
                  </div>
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

          {/* Steps 1-3: Questions */}
          {stepIndex > 0 && stepIndex <= questions.length && (
            <>
              <div className="card questiontool">
                <div className="mb-4">
                  <div className="step-count-indicator">
                    {questions[stepIndex - 1].step}
                  </div>
                </div>
                <h5 className="fw-bold mb-4">{questions[stepIndex - 1].title}</h5>

                <form>
                  <div className="form-check mb-3">
                    <input type="radio" className="form-check-input" name={`q${stepIndex}`} id={`opt1-${stepIndex}`} />
                    <label className="form-check-label" htmlFor={`opt1-${stepIndex}`}>
                      No prior knowledge of this topic. It's an area for growth and development.
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input type="radio" className="form-check-input" name={`q${stepIndex}`} id={`opt2-${stepIndex}`} />
                    <label className="form-check-label" htmlFor={`opt2-${stepIndex}`}>
                      I have knowledge and some experience with this concept.
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input type="radio" className="form-check-input" name={`q${stepIndex}`} id={`opt3-${stepIndex}`} />
                    <label className="form-check-label" htmlFor={`opt3-${stepIndex}`}>
                      I've applied this concept several times and can lead a team in this topic.
                    </label>
                  </div>
                  <div className="form-check">
                    <input type="radio" className="form-check-input" name={`q${stepIndex}`} id={`opt4-${stepIndex}`} />
                    <label className="form-check-label" htmlFor={`opt4-${stepIndex}`}>
                      Others consider me a Subject Matter Expert on this Topic.
                    </label>
                  </div>
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
                    <span style={{ cursor: 'pointer', userSelect: 'none' }}><FontAwesomeIcon icon={faChevronLeft} /></span> Lean Manufacturing - Principles and Implementation
                </h3>

                <video width="100%" controls style={{ marginTop: '20px' }}>
                    <source src="mov_bbb.mp4" type="video/mp4" />
                    <source src="mov_bbb.ogg" type="video/ogg" />
                    Your browser does not support HTML video.
                </video>

                <p className="mt-4 text-start video-text">
                   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                </p>
                <p className="mt-4 text-start video-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                </div>

                {/* <button
                type="button"
                className="get-started-button mt-4"
                onClick={() => alert('Get Started clicked!')}
                >
                Get Started
                </button> */}
                <button
  type="button"
  className="get-started-button mt-4"
  onClick={() =>
    window.location.href = "https://www.udemy.com/?deal_code=UDEAFNULP0324&utm_term=Homepage&utm_content=Textlink&utm_campaign=NewUserLP0324&utm_source=aff-campaign&utm_medium=udemyads&LSNPUBID=znpz0s2okgU&ranMID=47901&ranEAID=znpz0s2okgU&ranSiteID=znpz0s2okgU-XUTy3qk39nuPg.jt5BDggA&gad_source=1&gad_campaignid=22498850779&gbraid=0AAAAApkvLA7sfwOp_ixIM00NTL66aqfT_&gclid=Cj0KCQjwotDBBhCQARIsAG5pinOlM7T_A1W787l3j0CP50k_Vkx5l8ilDeoRqOFrP6EHArbeIMTWQvwaAhvFEALw_wcB"
  }
>
  Get Started
</button>
            </>
            )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Question;
