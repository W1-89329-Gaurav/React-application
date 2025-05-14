import React from 'react';
import { Link } from 'react-router';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/home">QuotesApp</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/my-quotes">My Quotes</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/add-quote">Add Quote</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/login">Logout</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
