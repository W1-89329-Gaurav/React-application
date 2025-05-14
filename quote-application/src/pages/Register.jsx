import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { userSignUp } from '../services/userService';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneno: '',
    address: '',
  });
  
  const [passwordError, setPasswordError] = useState('');

  // const handleInputFieldChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  
  const handleInputFieldChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    if (name === 'confirmPassword' || name === 'password') {
      if (
        (name === 'confirmPassword' && value !== updatedForm.password) ||
        (name === 'password' && updatedForm.confirmPassword && updatedForm.confirmPassword !== value)
      ) {
        setPasswordError('Passwords do not match!');
      } else {
        setPasswordError('');
      }
    }

    setFormData(updatedForm);
  };

  const handleSignUpClick = async () => {
    const { firstName, lastName, email, password, confirmPassword, phoneno, address } = formData;

    if (!firstName || !lastName || !email || !password || !phoneno || !address) {
      toast.error('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      await userSignUp(firstName, lastName, email, password, phoneno, address);
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      toast.error(`Registration failed: ${err.message}`);
    }
  };

  return (
    <div className="card mx-auto mt-4" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h4 className="card-title text-center mb-4">Register</h4>

        <input
          type="text"
          name="firstName"
          className="form-control mb-2"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputFieldChange}
        />
        <input
          type="text"
          name="lastName"
          className="form-control mb-2"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputFieldChange}
        />
        <input
          type="email"
          name="email"
          className="form-control mb-2"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputFieldChange}
        />
        <input
          type="password"
          name="password"
          className="form-control mb-2"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputFieldChange}
        />
       <input
          type="password"
          name="confirmPassword"
          className={`form-control mb-1 ${passwordError ? 'is-invalid' : ''}`}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputFieldChange}
        />
        {passwordError && (
          <div className="text-danger mb-2" style={{ fontSize: '0.9rem' }}>
            {passwordError}
          </div>
        )}

        <input
          type="text"
          name="phoneno"
          className="form-control mb-2"
          placeholder="Phone Number"
          value={formData.phoneno}
          onChange={handleInputFieldChange}
        />
        <input
          type="text"
          name="address"
          className="form-control mb-3"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputFieldChange}
        />

        <button className="btn btn-success w-100" onClick={handleSignUpClick}>
          Register
        </button>

        <p className="text-center mt-3">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
