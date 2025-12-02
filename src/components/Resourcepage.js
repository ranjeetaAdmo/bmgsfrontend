import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import './styles/resourcepage.css';
import { useNavigate } from 'react-router-dom';

const ResourcePage = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

const handleResouceClick = () => {
    navigate('/question');
};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Form submitted successfully!");
    setFormData({ name: '', email: '', phone: '', message: '' });
    handleClose(); // Close the modal
  };

  return (
    <div className="container py-5 ">
      <div className="p-4 rounded shadow-sm bg-white">
        <h2 className="Learning-head">🎓 Learning Resources</h2>
        <p className="lead text-center learntext">
          Your gateway to continuous learning and skill enhancement.
        </p>

        <div className="row mt-3 g-4">
          <div className="col-md-6">
            <div className="p-3 border rounded bg-white h-100 learning-box">
              <h5>📘 Free Learning Guides</h5>
              <p>Download e-books, cheat sheets, and roadmaps to guide your learning journey.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 border rounded bg-white h-100 learning-box">
              <h5>🧪 Practice Labs</h5>
              <p>Hands-on exercises, quizzes, and project kits to solidify your knowledge.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 border rounded bg-white h-100 learning-box">
              <h5>🎥 Video Tutorials</h5>
              <p>Watch step-by-step courses and real-time coding walkthroughs from experts.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 border rounded bg-white h-100 learning-box">
              <h5>📄 Certification Paths</h5>
              <p>Choose from curated learning paths to build job-ready skills and earn certifications.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <Button variant="primary" onClick={handleShow} className="px-4 py-2 get-btn">
            🚀 Get Started
          </Button>
        </div>
      </div>

      {/* Modal Popup */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Get in Touch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Your Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 modal-btn" onClick={handleResouceClick}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ResourcePage;
