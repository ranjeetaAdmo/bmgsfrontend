import './styles/Contact.css';

const Contact = () => (
  <section className="contact-section">
    <div className="contact-container-fluid">
      <div className="contact-left">
        <h2>Contact BGMS</h2>
        <div className='contact-box'>
        <div className="contact-detail">
          <div className="icon email" />
          <div>
            {/* <h4>Email</h4> */}
            <p>info@gmail.com</p>
          </div>
        </div>
         <div className="contact-detail">
          <div className="icon web" />
          <div>
            {/* <h4>Website</h4> */}
            <p>beyondlean.com</p>
          </div>
        </div>
      </div>
      <div className='social-icon'>
          <div className='icon facebook'></div>
           <div className='icon instagram'></div>
            <div className='icon youtube'></div>
      </div>
       <p className="footer-text">
      ©<span className="highlight"> BeyondLean.com</span>. All rights reserved.
    </p>
{/* 
      <div className="contact-form-box">
        <h2>Get in Touch</h2>
        <form className="contact-form">
          <label>Name</label>
          <input type="text" placeholder="Your Name" />
          <label>Email</label>
          <input type="email" placeholder="Your Email Address" />
          <label>Phone Number</label>
          <input type="tel" placeholder="Your Phone number" />
          <label>Message</label>
          <textarea placeholder="Your Message" rows="5"></textarea>
          <button type="submit">Submit</button>
        </form>
      </div> */}
    </div>
    </div>
  </section>
);

export default Contact;