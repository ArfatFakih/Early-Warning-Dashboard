import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/Login.css';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const state = location.pathname === '/login' ? 'Login' : 'Sign Up';

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log('Login Function Executed', formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log('Signup Function Executed', formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="login">
      <section className="loginsignup">
        <div className="form-box">
          <div className="loginsignup-container">
            <h2>{state}</h2>
            <div className="loginsignup-fields">
              {state === 'Sign Up' && (
                <div className="inputbox">
                  <input
                    name="username"
                    value={formData.username}
                    onChange={changeHandler}
                    type="text"
                    required
                  />
                  <label>UserName</label>
                </div>
              )}
              <div className="inputbox">
                <input
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  type="text"
                  required
                />
                <label>Email</label>
              </div>
              <div className="inputbox">
                <input
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  type="password"
                  required
                />
                <label>Password</label>
              </div>
            </div>
            <button
              onClick={() => {
                state === 'Login' ? login() : signup();
              }}
              className="login-button"
            >
              Continue
            </button>
            {state === 'Sign Up' ? (
              <p className="register">
                Already have an account?{' '}
                <span onClick={() => navigate('/login')} className="login-link">
                  Login here
                </span>
              </p>
            ) : (
              <p className="register">
                Create an account?{' '}
                <span onClick={() => navigate('/signup')} className="login-link">
                  Click here
                </span>
              </p>
            )}

            <div className="forget">
              <label>
                <input type="checkbox" /> By continuing, I agree to the{' '}
                <span className="terms-link">terms of use</span> &{' '}
                <span className="privacy-link">privacy policy</span>.
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
