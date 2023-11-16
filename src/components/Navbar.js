import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom'
import { Button } from '@mui/material';


const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  let location = useLocation();
  useEffect(() => {
  }, [location])
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink activeclassname="active" className="navbar-brand" to="/">iNotebook</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <Button className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/about" variant="text" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>
                  Home
                </Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <Button className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about" variant="text" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>
                  About
                </Button>
              </Link>
            </li>

            {!localStorage.getItem('token') ?
              <div className="d-flex">
                <li className="nav-item">
                  {/* Login Link */}
                  <Link className="mx-1 nav-link" to="/login" role="button" >
                    <Button className="nav-link" aria-current="page" to="/login" variant="text" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>
                      Login
                    </Button>
                  </Link>
                </li>
                {/* Register Link */}
                <li>
                  <Link className="mx-1 nav-link" to="/signup" role="button">
                    <Button className="nav-link" to="/signup" variant="outlined" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>
                      Join us
                    </Button>
                  </Link>
                </li>
              </div> :
              // Logout Button
              <li>
                <Button onClick={handleLogout} className="nav-item ms-2" variant="outlined" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}>
                  Logout
                </Button>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
