import React from 'react';
import './styles/LeanIntroSection.css';
import { FaCheckCircle } from 'react-icons/fa';

const Card = ({ title, children }) => (
  <div className="lean-card p-4 mb-4 rounded shadow-sm bg-white">
    <h4 className="learntext">{title}</h4>
    <div className='learn-body'>{children}</div>
  </div>
);

const LeanIntroSection = () => {
  return (
    <section className="lean-intro-section py-5">
      <div className="container">
        <h2 className="learnhead">Getting Started with Lean Manufacturing</h2>
        {/* <p className="text-center text-muted mb-5">
          Explore the mindset, tools, and benefits that make Lean a game-changer for modern professionals.
        </p> */}

        <Card title="1. What is Lean Manufacturing?">
          <p className='learnbody'>
            Lean manufacturing is a powerful methodology designed to streamline processes and minimize waste,
            delivering maximum value to customers with fewer resources. Originally developed by Toyota,
            it emphasizes efficiency, continuous improvement, and effective use of materials, time, and effort.
          </p>
        </Card>

        <Card title="2. The Principles of Lean Manufacturing">
          <ul>
            <li><FaCheckCircle className="me-2 text-success" /> Understand and define what creates value for customers.</li>
            <li><FaCheckCircle className="me-2 text-success" /> Analyze and map processes to identify waste and inefficiencies.</li>
            <li><FaCheckCircle className="me-2 text-success" /> Ensure smooth workflows to keep operations running seamlessly.</li>
            <li><FaCheckCircle className="me-2 text-success" /> Adopt pull systems to produce only what is needed, avoiding excess.</li>
            <li><FaCheckCircle className="me-2 text-success" /> Commit to continuous improvement to achieve perfection over time.</li>
          </ul>
        </Card>

        <Card title="3. Why Lean Manufacturing Matters for Your Career">
          <ul>
            <li><FaCheckCircle className="me-2 text-success" /> Develop a mindset focused on problem-solving and efficiency.</li>
            <li><FaCheckCircle className="me-2 text-success" /> Gain a competitive edge by understanding industry best practices.</li>
            <li><FaCheckCircle className="me-2 text-success" /> Contribute to reducing costs and enhancing team productivity.</li>
            <li><FaCheckCircle className="me-2 text-success" /> Strengthen your ability to adapt in dynamic work environments.</li>
            <li><FaCheckCircle className="me-2 text-success" /> Work effectively in diverse teams toward shared goals.</li>
          </ul>
        </Card>

        <Card title="4. Tools and Techniques You Should Know">
          <ul>
            <li><strong>5S:</strong> Organizing the workplace for clarity and efficiency.</li>
            <li><strong>Kaizen:</strong> Driving continuous improvement through small, consistent efforts.</li>
            <li><strong>Kanban:</strong> Visualizing workflows for better communication and planning.</li>
            <li><strong>Value Stream Mapping:</strong> Finding bottlenecks and optimizing processes.</li>
            <li><strong>Just-In-Time:</strong> Producing only what's needed, when it's needed.</li>
          </ul>
        </Card>

        <Card title="5. Building a Lean Mindset">
          <p>
            Lean manufacturing isn’t just a set of tools—it’s a way of thinking. Embrace a culture of collaboration,
            shared responsibility, and a continuous improvement mindset. You'll contribute to a workplace that
            values growth, agility, and long-term success.
          </p>
          <ul>
            <li><strong>Skill-Based Courses:</strong> Covering in-demand skills like marketing, coding, and leadership.</li>
            <li><strong>Flexible Learning:</strong> Learn anytime, anywhere, at your own pace.</li>
            <li><strong>Expert Instructors:</strong> Professionals who bring real-world experience to every lesson.</li>
            <li><strong>Certifications:</strong> Earn credentials to showcase your skills and enhance your resume.</li>
          </ul>
        </Card>

     
      </div>
    </section>
  );
};

export default LeanIntroSection;
