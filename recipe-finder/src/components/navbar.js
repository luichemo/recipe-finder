import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/favorites">FAVORITES</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
