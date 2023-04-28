import React, { useState } from "react";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import { register } from "../../actions/auth";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import { Navigate } from "react-router-dom";

const Register = ({
  auth: { isAuthenticated, loading },
  register,
  createProfile,
}) => {
  const [checked, setChecked] = useState("false");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    street: "",
    city: "",
    postCode: "",
    phone: "",
  });

  const { name, email, password, street, city, postCode, phone } = formData;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    register({ name, password, email });
    if (!checked) createProfile({ phone, address: { postCode, city, street } });
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <Alert />
      <form onSubmit={e => onSubmit(e)} className="register-form">
        <div>
          <input
            type="text"
            placeholder="Name *"
            value={name}
            name="name"
            className="input"
            onChange={e => onChange(e)}></input>
        </div>
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
        <div className="register-address">
          <h3>Info (optional)</h3>
          <input type="checkbox" onClick={() => setChecked(!checked)}></input>
        </div>

        <div>
          <input
            type="text"
            placeholder="Street *"
            disabled={checked ? true : false}
            className="input"
            value={street}
            name="street"
            onChange={e => onChange(e)}></input>
          <input
            type="text"
            placeholder="City *"
            disabled={checked ? true : false}
            className="input"
            value={city}
            name="city"
            onChange={e => onChange(e)}></input>
        </div>
        <div>
          <input
            type="text"
            inputMode="numeric"
            placeholder="PostCode *"
            disabled={checked ? true : false}
            className="input"
            value={postCode}
            name="postCode"
            onChange={e => onChange(e)}></input>
          <input
            type="number"
            placeholder="Phone number *"
            disabled={checked ? true : false}
            className="input"
            value={phone}
            name="phone"
            onChange={e => onChange(e)}></input>
        </div>
        <div>
          <input type="submit" value="Register" className="btn"></input>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register, createProfile })(Register);
