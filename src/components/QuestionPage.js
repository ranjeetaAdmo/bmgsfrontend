import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import './styles/QuestionPage.css';
import { Modal } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Sidebar from './Sidebar';
import Header from './Headerbs';
import { FaPlus } from 'react-icons/fa';

const QuestionPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [currentStep, setCurrentStep] = useState(1);
  const questionsPerPage = 5;  // ⭐Pagination limit

  const [questions, setQuestions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/getQuestions`, {
          withCredentials: true,
        });

        const normalized = res.data.map(q => ({
          id: q.id,
          text: q.question_text,
          createdAt: q.created_at,
          category: q.category_name,
        }));

        setQuestions(normalized);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setQuestions([]);
      }
      finally {
        setLoadingUsers(false);
      }
    };

    fetchQuestions();
  }, []);

  if (!auth) return <p>AuthContext not available</p>;
  const { user, loading } = auth;

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" />;
  if (user.role !== "admin") return <Navigate to="/question" />;


  // ⭐ Pagination logic
  const indexOfLastQuestion = currentStep * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const totalSteps = Math.ceil(questions.length / questionsPerPage);

  const goToNextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleDelete = async () => {
    if (!selectedQuestionId) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/deletequestion`,
        { id: selectedQuestionId },
        { withCredentials: true }
      );

      setQuestions(prev => prev.filter(q => q.id !== selectedQuestionId));
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("Failed to delete question");
    } finally {
      setShowDeleteModal(false);
      setSelectedQuestionId(null);
    }
  };

  const confirmDelete = (id) => {
    setSelectedQuestionId(id);
    setShowDeleteModal(true);
  };


  const handleEdit = (id) => {
    navigate(`/edit-question/${id}`);
  };

  const handleView = (id) => {
    navigate(`/view-question/${id}`);
  };

  return (
    <div className="app-container d-flex">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isCollapsed ? "collapsed" : ""}  flex-grow-1`}>
        <Header toggleSidebar={toggleSidebar} />
        <div className="container question-page">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className='Questionheading'>Questions Details</h3>
            <button className="add-user-btn" onClick={() => navigate('/add-question')}>
              <FaPlus /> Add Question
            </button>
          </div>

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Sr No</th>
                <th>Question</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentQuestions.map((q, index) => (
                <tr key={q.id}>
                  <td>{indexOfFirstQuestion + index + 1}</td>
                  <td>{q.text}</td>
                  <td>{q.category}</td>
                  <td>
                    <button className="action-icon view" onClick={() => handleView(q.id)}>
                      <FaEye />
                    </button>
                    <button className="action-icon edit" onClick={() => handleEdit(q.id)}>
                      <MdEdit />
                    </button>
                    <button className="action-icon delete" onClick={() => confirmDelete(q.id)}>
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          {/* Delete Modal */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
            <Modal.Footer>
              <button className="confirm-btn" onClick={handleDelete}>Delete</button>
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </Modal.Footer>
          </Modal>

          {/* ⭐ Pagination UI */}
          <div className="pagination">
            <button disabled={currentStep === 1} onClick={goToPreviousStep}>
              &laquo; Prev
            </button>

            <span>Page {currentStep} of {totalSteps}</span>

            <button disabled={currentStep === totalSteps} onClick={goToNextStep}>
              Next &raquo;
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
