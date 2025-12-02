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
    </div>
    </div>
  </section>
)

export default Contact;