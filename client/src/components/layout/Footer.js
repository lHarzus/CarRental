import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const Footer = props => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-socials">
        <Link to="https://www.instagram.com" target="_blank">
          <i className="bi bi-instagram"></i>
        </Link>
        <Link to="https://www.facebook.com" target="_blank">
          <i className="bi bi-facebook"></i>
        </Link>
        <Link to="https://www.youtube.com" target="_blank">
          <i className="bi bi-youtube"></i>
        </Link>
        <Link to="https://www.twitter.com" target="_blank">
          <i className="bi bi-twitter"></i>
        </Link>
      </div>
      <div className="footer-contacts">
        <h3>Contacts</h3>
        <p>
          <i className="bi bi-telephone-fill"></i> +365 911 111 111
        </p>
        <p>
          <i className="bi bi-envelope-fill"></i> rentacar@hotmail.com
        </p>
        <p>
          <i className="bi bi-house"> 3458 Better Street, KS 64106</i>
        </p>
      </div>
      <div className="footer-logo">
        <Link
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          to="/"
          className="navbar-logo">
          <img src={logo}></img>
          <h2>RentACar</h2>
        </Link>

        <p>&copy; 2018 RentACar</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
