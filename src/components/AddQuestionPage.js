import React, { useState , useEffect } from 'react';
import './styles/QuestionPage.css';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Header from './Headerbs';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

const AddQuestionPage = () => {
  const navigate = useNavigate();
  
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [categories, setCategories] = useState([]);

    const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  const [formData, setFormData] = useState({
    category: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswerIndex: null,
  });

   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://148.230.92.191:5000/api/categories");
        setCategories(res.data); // assuming API returns an array
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (value, index) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleCorrectAnswerSelect = (e) => {
    setFormData({ ...formData, correctAnswerIndex: parseInt(e.target.value) });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const finalData = {
  categoryId: formData.category, // category dropdown gives id
  question: formData.question,
  options: formData.options,     // array of 4
  correctAnswerIndex: formData.correctAnswerIndex, // 0-3
};

  try {
    // Send data to backend
    const res = await axios.post("http://148.230.92.191:5000/api/addQuestions", finalData);

    if (res.status === 200 || res.status === 201) {
       Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Question added successfully!',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        // Clear form after submit
        setFormData({
          category: "",
          question: "",
          options: ["", "", "", ""],
          correctAnswerIndex: null,
        });

      // Navigate to questions page
      navigate("/questions");
       });
    }
  } catch (err) {
    console.error("Error adding question:", err);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.response?.data?.message || "Failed to add question. Please try again.",
      confirmButtonColor: '#d33',
    });
  }
};


  return (
    <div className="app-container d-flex">
       <Sidebar isCollapsed={isCollapsed} />

      <div className="main-content flex-grow-1">
          <Header toggleSidebar={toggleSidebar} />
        <div className="container addquestion">
          <div className="d-flex align-items-center mb-3 addtop">
            <Button className="addbtn" onClick={() => navigate('/questions')}>
              <FaArrowLeft />
            </Button>
            <h3 className="addheading">Add Question</h3>
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
                {formData.options.map((option, index) => (
                  <option key={index} value={index}>
                    {option || `Option ${index + 1}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className='addsubmit'>
              Submit 
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionPage;
