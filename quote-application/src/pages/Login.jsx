import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userSignIn } from '../services/users';
import { saveToken ,saveUser } from '../utils/auth';
// const Login = () => {
//   return (
//     <div className="card mx-auto" style={{ maxWidth: '400px' }}>
//       <div className="card-body">
//         <h4 className="card-title text-center">Login</h4>
//         <input type="email" className="form-control mb-3" placeholder="Email" />
//         <input type="password" className="form-control mb-3" placeholder="Password" />
//         <button className="btn btn-primary w-100">Login</button>
//         <p className="text-center mt-3">
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter both email and password!');
      return;
    }

    try {
      const response = await userSignIn(email, password);
      // Assume response.token is your JWT or session token
      saveToken(response.token); // Save token to localStorage
      saveUser({ id: response.id, name: response.name});
      toast.success('Login successful!');
      setTimeout(() => navigate('/home'), 1000);
    } catch (err) {
      toast.error('Invalid credentials! ' + err.message);
    }
  };

  return (
    <div className="card mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <div className="card-body">
        <h4 className="card-title text-center mb-4">Login</h4>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
          Login
        </button>

        <p className="text-center">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
