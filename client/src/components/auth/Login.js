import React, { useState } from "react";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = ({ auth: { isAuthenticated, loading }, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="register">
      <h1>Login</h1>
      <Alert />
      <form onSubmit={e => onSubmit(e)} className="register-form">
        <div>
          <input
            type="text"
            placeholder="Email *"
            className="input"
            value={email}
            name="email"
            onChange={e => onChange(e)}></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password *"
            className="input"
            value={password}
            name="password"
            onChange={e => onChange(e)}></input>
        </div>
        <div>
          <input type="submit" value="Login" className="btn"></input>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
