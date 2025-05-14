import { useEffect, useState } from "react";
import { fetchUserById, updateUserById } from "../services/userService"; 
import { getUserId } from "../utils/auth"; 
import { toast } from 'react-toastify';

const Profiles = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneno: "",
    address: "",
  });

  const userId = getUserId(); 
  // Fetch existing user data
  useEffect(() => {
    if (!userId) {
      toast.error("User not logged in.");
      history.push("/login"); 
      return;
    }

    fetchUserById(userId)
      .then(data => setFormData(data))
      .catch(err => toast.error("Error loading profile: " + err.message));
  }, [userId]);

  // Handle form field changes
  const handleInputFieldChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit updated profile
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateUserById(userId, formData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Update failed: " + error.message);
    }
  };

  return (
    <div className="card mx-auto mt-4" style={{ maxWidth: "500px" }}>
      <div className="card-body">
        <h4 className="card-title text-center">Edit Profile</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputFieldChange}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputFieldChange}
          />
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputFieldChange}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Phone Number"
            name="phoneno"
            value={formData.phoneno}
            onChange={handleInputFieldChange}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleInputFieldChange}
          ></textarea>
          <button type="submit" className="btn btn-warning w-100">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profiles;
