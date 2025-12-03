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
              <p>info@bmgsadvisory.com</p>
            </div>
          </div>
          <div className="contact-detail">
            <div className="icon web" />
            <div>
              {/* <h4>Website</h4> */}
              <p>LeanintoAction.com</p>
            </div>
          </div>
        </div>
        <div className='social-icon'>
          <div className='icon facebook'></div>
          <div className='icon instagram'></div>
          <div className='icon youtube'></div>
        </div>
        <p className="footer-text">
          © <span className="highlight">
            <a
              href="http://leanintoaction.com/"
              target="_blank"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              LeanintoAction.com
            </a>
          </span>. All rights reserved.
        </p>

      </div>
    </div>
  </section>
);

export default Contact;