import React from 'react'

import { Link } from 'react-router-dom'
import Logo from '../images/logo.png'

const Header = () => {
  return (
    <nav>
        <div className="container nav__container">
            <Link to="/" className='nav__logo'>
              <img src={Logo} alt="Navbar Logo" />
            </Link>
            <ul className="nav__menu">
              <li><Link to="/profile">Cool guy</Link></li>
              <li><Link to="/create">Create Post</Link></li>
              <li><Link to="/authors">Authors</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default Header