import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Appheader = () => {
  const [displayusername, displayusernameupdate] = useState('');
  const [showmenu, showmenuupdate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Track user role
  const usenavigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/register') {
      showmenuupdate(false);
      setIsAdmin(false);
    } else {
      showmenuupdate(true);
      let username = sessionStorage.getItem('username');
      let userRole = sessionStorage.getItem('userRole'); // Assuming you have a user role stored in sessionStorage
      if (username === '' || username === null) {
        usenavigate('/');
      } else {
        displayusernameupdate(username);
        setIsAdmin(userRole === 'admin'); // Update isAdmin based on user role
      }
    }
  }, [location])

  return (
    <div>
      {showmenu && (
        <div>
          {isAdmin ? (
            <Navbar bg="dark" expand="lg" style={{ height: '80px' }}>
              <Navbar.Brand style={{ marginLeft: '20px', fontSize: '28px', color: '#888888' }}>
                <span style={{ fontWeight: 'bold' }}>Admin Panel</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <NavLink className="nav-link" to="/users" style={{ fontSize: '20px' }}>
                    Users
                  </NavLink>
                  <NavLink className="nav-link" to="/hobby" style={{ fontSize: '20px' }}>
                    Hobby
                  </NavLink>
                  <NavLink className="nav-link" to="/suggestion" style={{ fontSize: '20px' }}>
                    Suggestion
                  </NavLink>

                </Nav>
                <Nav className="ms-auto">
                  <NavLink className="nav-link" to="/settings" style={{ marginRight: '20px', fontSize: '20px' }}>
                    Profile
                  </NavLink>
                  <NavLink className="nav-link" to="/" style={{ marginRight: '20px', fontSize: '20px' }}>
                    Logout
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          ) : (
            <Navbar bg="dark" expand="lg" style={{ height: '80px' }}>
              <Navbar.Brand style={{ marginLeft: '20px', fontSize: '28px', color: '#888888' }}>
                <span style={{ fontWeight: 'bold' }}>Coffee Time</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <NavLink className="nav-link" to="/hobby" style={{ fontSize: '20px' }}>
                    Hobby
                  </NavLink>
                  <NavLink className="nav-link" to="/suggestion" style={{ fontSize: '20px' }}>
                    Suggestion
                  </NavLink>
                </Nav>

                <Nav className="ms-auto">
                  <NavLink className="nav-link" to="/settings" style={{ marginRight: '20px', fontSize: '20px' }}>
                    Profile
                  </NavLink>
                  <NavLink className="nav-link" to="/" style={{ marginRight: '20px', fontSize: '20px' }}>
                    Logout
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          )}
        </div>
      )}
    </div>
  );
}

export default Appheader;
