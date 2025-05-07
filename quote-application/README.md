# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('/api/profile', profile);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded bg-light">
        <div className="card-header bg-primary text-white text-center">
          <h3>User Profile</h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                rows="3"
                name="address"
                value={profile.address}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success px-5">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;






111111





const express = require('express');
const router = express.Router();

// Mock DB object for demonstration (replace with real DB logic)
let userProfile = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '1234567890',
  address: '123 Main St, City',
};

// GET profile
router.get('/', (req, res) => {
  // Normally: fetch from DB by user ID (req.user.id)
  res.json(userProfile);
});

// PATCH profile
router.patch('/', (req, res) => {
  const { firstName, lastName, email, phone, address } = req.body;

  // Normally: validate inputs, update DB by user ID
  userProfile = {
    ...userProfile,
    firstName,
    lastName,
    email,
    phone,
    address,
  };

  res.status(200).json({ message: 'Profile updated successfully', userProfile });
});

module.exports = router;





const express = require('express');
const bodyParser = require('body-parser');
const profileRoutes = require('./routes/profile');

cons app = express();
app.use(bodyParser.json());

app.use('/api/profile', profileRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
 



