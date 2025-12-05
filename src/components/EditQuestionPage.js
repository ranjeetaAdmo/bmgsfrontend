import React, { useEffect, useState } from 'react';
import './styles/QuestionPage.css';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Header from './Headerbs';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
const EditQuestionPage = () => {
  const { index } = useParams(); // get index from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswerIndex: null,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/categories`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(res.data); // assuming API returns an array
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/getQuestionById/${index}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const q = res.data;

        // Convert individual options to an array
        const options = [q.option1, q.option2, q.option3, q.option4];

        // correct_option is a string "3", convert to 0-based index
        const correctAnswerIndex = parseInt(q.correct_option, 10) - 1;

        setFormData({
          category: q.category_id, // or q.category_name if you have it
          question: q.text,
          options,
          correctAnswerIndex,
        });
      } catch (err) {
        console.error(err);
        alert('Failed to fetch question');
      }
    };

    fetchQuestion();
  }, [index]);


  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (value, i) => {
    const newOptions = [...formData.options];
    newOptions[i] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleCorrectAnswerSelect = (e) => {
    setFormData({ ...formData, correctAnswerIndex: parseInt(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedQuestion = {
        id: index, // <-- this comes from useParams()
        categoryId: formData.category,  // backend expects categoryId (not category name)
        questionText: formData.question,
        options: formData.options,
        correctAnswerIndex: formData.correctAnswerIndex,
      };
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/editQuestion`,
        updatedQuestion,
        { 
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      Swal.fire('Success', res.data.message, 'success').then(() => {
        navigate("/questions");
      });
    } catch (err) {
      console.error("Error updating question:", err);
      Swal.fire('Error', err.response?.data?.message || "Failed to update question", 'error');
    }
  };


  return (
    <div className="app-container d-flex">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isCollapsed ? "collapsed" : ""}  flex-grow-1`}>
        <Header toggleSidebar={toggleSidebar} />
        <div className="container addquestion">
          <div className="d-flex align-items-center mb-3 addtop">
            <Button className="addbtn" onClick={() => navigate('/questions')}>
              <FaArrowLeft />
            </Button>
            <h3 className="addheading">Edit Question</h3>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Label className="mb-2">Options</Form.Label>
            <Row>
              {[0, 1].map((index) => (
                <Col md={6} key={index} className="mb-2">
                  <Form.Control
                    type="text"
                    value={formData.options[index]}
                    onChange={(e) => handleOptionChange(e.target.value, index)}
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                </Col>
              ))}
            </Row>
            <Row>
              {[2, 3].map((index) => (
                <Col md={6} key={index} className="mb-2">
                  <Form.Control
                    type="text"
                    value={formData.options[index]}
                    onChange={(e) => handleOptionChange(e.target.value, index)}
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                </Col>
              ))}
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Select
                name="correctAnswerIndex"
                value={
                  formData.correctAnswerIndex !== null
                    ? formData.correctAnswerIndex
                    : ''
                }
                onChange={handleCorrectAnswerSelect}
                required
              >
                <option value="">Select correct answer</option>
                {formData.options.map((option, i) => (
                  <option key={i} value={i}>
                    {option || `Option ${i + 1}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="addsubmit">
              Update
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionPage;
