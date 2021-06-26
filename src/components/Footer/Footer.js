import React from "react";
import "./Footer.css";
import { SocialIcon } from "react-social-icons";

function Footer() {
  return (
    <div className="footer--container">
      <div className="icons--row">
        <SocialIcon className="icon" url="https://www.linkedin.com/in/nishant-kumar-6a57a117b/" />
        <SocialIcon className="icon" url="https://github.com/nshnt1999" bgColor="#fff" />
      </div>
      <p>Design inspired from <a href="https://frontendmasters.com/">Frontend Masters</a></p>
    </div>
  );
}

export default Footer;
