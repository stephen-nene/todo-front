import React from 'react';
import { Link, NavLink} from 'react-router-dom';
import './navbar.css'; // Import CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="navbar-link" to="/">Home</Link>
      <NavLink to="/add-todo" className="navbar-link">Add Todo</NavLink>
      <NavLink to="/profile" className="navbar-link">Profile</NavLink>
    </nav>
  );
}

export default Navbar;
