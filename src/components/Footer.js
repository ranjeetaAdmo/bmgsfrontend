import './styles/Footer.css';

const Footer = () => (
  <footer className="footer">
    {/* <ul className="footer-links">
      <li>HOME</li>
      <li>ABOUT US</li>
      <li>CONTACT US</li>
    </ul> */}

    {/* <div className="footer-divider"></div> */}

   <p className="footer-text">
    © <span className="highlight">
  <a 
    href="http://leanintoaction.com/" 
    target="_blank" 
    style={{ color: "inherit", textDecoration: "none" }}
  >
    LeanIntoAction.com
  </a>
</span>. All rights reserved.
    </p>
  </footer>
);

export default Footer;