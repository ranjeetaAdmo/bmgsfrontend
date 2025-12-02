import React, { useEffect, useState } from 'react';
import './styles/QuestionPage.css';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Header from './Headerbs';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewQuestionPage = () => {
  const navigate = useNavigate();
  const { index } = useParams();
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    if (questions[index]) {
      setQuestionData(questions[index]);
    } else {
      navigate('/questions');
    }
  }, [index, navigate]);

  return (
    <div className="app-container d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        <Header />
        <div className="container addquestion">
          <div className="d-flex align-items-center mb-3 addtop">
            <Button className="addbtn" onClick={() => navigate('/questions')}>
              <FaArrowLeft />
            </Button>
            <h3 className="addheading">View Question</h3>
          </div>

          {questionData && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" value={questionData.category} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Question</Form.Label>
                <Form.Control as="textarea" rows={3} value={questionData.question} readOnly />
              </Form.Group>

              <Form.Label className="mb-2">Options</Form.Label>
              <Row>
                {[0, 1].map((index) => (
                  <Col md={6} key={index} className="mb-2">
                    <Form.Control
                      type="text"
                      value={questionData.options[index] || ''}
                      readOnly
                    />
                  </Col>
                ))}
              </Row>
              <Row>
                {[2, 3].map((index) => (
                  <Col md={6} key={index} className="mb-2">
                    <Form.Control
                      type="text"
                      value={questionData.options[index] || ''}
                      readOnly
                    />
                  </Col>
                ))}
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Correct Answer</Form.Label>
                <Form.Control type="text" value={questionData.correctAnswer} readOnly />
              </Form.Group>
            </Form>
            
          )}
             <div className="d-flex align-items-center mb-3 addtop">
            <Button className="ms-auto addbottom" onClick={() => navigate('/questions')}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestionPage;
