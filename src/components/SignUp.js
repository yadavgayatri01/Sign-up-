import React from "react";
import { useState, useEffect } from "react";
import "../App.css";

const SignUp = () => {
  const initialValues = { username: "", email: "", number: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.number) {
      errors.number = "Number is required!";
    } else if (values.number.length < 10) {
      errors.number = "Enter valid number";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!strongRegex.test(values.password)) {
      errors.password =
        "Not valid! Atleast contains minimum 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character";
    }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>SignUp Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Number</label>
            <input
              type="number"
              name="number"
              placeholder="Number"
              value={formValues.number}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.number}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <div className="button">
            <button className="fluid ui blue">Submit</button>
          </div>
        </div>
        <div>
          (Or <span style={{ color: "red" }}>login</span> if you already have an
          account).
        </div>
      </form>
    </div>
  );
};

export default SignUp;
