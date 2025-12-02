import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import './styles/QuestionPage.css';
import { Modal, Button } from 'react-bootstrap';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Sidebar from './Sidebar';
import Header from './Headerbs';
import { FaPlus } from 'react-icons/fa';


const QuestionPage = () => {
   const navigate = useNavigate();
   const auth = useContext(AuthContext);
   const [loadingUsers, setLoadingUsers] = useState(true);

  const [questions, setQuestions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

   const [isCollapsed, setIsCollapsed] = useState(false);
   const toggleSidebar = () => {
     setIsCollapsed(prev => !prev);
   };
  useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://148.230.92.191:5000/api/getQuestions", {
        withCredentials: true,
      });

      // normalize fields if needed
      const normalized = res.data.map(q => ({
        id: q.id,
        text: q.question_text,
        createdAt: q.created_at,
        category: q.category_name,
      }));

      setQuestions(normalized);
      console.log("Fetched questions:", normalized);
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


 const handleDelete = async () => {
  if (!selectedQuestionId) return;

  try {
    await axios.post("http://148.230.92.191:5000/api/deletequestion", 
      { id: selectedQuestionId }, 
      { withCredentials: true }
    );

    // Update UI after successful delete
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


  const handleEdit = (index) => {
    navigate(`/edit-question/${index}`);
  };

  const handleView = (index) => {
    navigate(`/view-question/${index}`);
  };

  return (
    <div className="app-container d-flex">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="main-content flex-grow-1">
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
              {questions.map((q, index) => (
                <tr key={q.id}>
                  <td>{index + 1}</td>
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

          {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this question?
        </Modal.Body>
        <Modal.Footer>
          <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
          <button className="confirm-btn" onClick={handleDelete}>Delete</button>
        </Modal.Footer>
      </Modal>

        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
