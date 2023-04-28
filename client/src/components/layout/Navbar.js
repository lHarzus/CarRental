import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [visible, setVisible] = useState(false);

  const authLinks = (
    <ul className={visible ? "navbar-items" : "navbar-items invisible"}>
      <li>
        <a href="#">Home</a>
      </li>
      <li>
        <Link to="/">Rent</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link onClick={() => logout()} to="/">
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className={visible ? "navbar-items" : "navbar-items invisible"}>
      <li>
        <Link
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          to="/">
          Home
        </Link>
      </li>
      <li>
        <a href="#footer">Contacts</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <div className="navbar">
      <div className="navbar-title">
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

        <i
          className="bi bi-list toggler"
          onClick={() => setVisible(!visible)}></i>
      </div>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
