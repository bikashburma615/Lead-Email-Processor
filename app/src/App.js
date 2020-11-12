import React from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Routes from './Routes';

function App() {
  return <React.Fragment>
    <Navbar bg="light" expand="lg" className="justify-content-end">
      <NavDropdown title="Tony Stark">
        <NavDropdown.Item>Set as Online</NavDropdown.Item>
        <NavDropdown.Item>Set as Away</NavDropdown.Item>
      </NavDropdown>
    </Navbar>
    <Router>
      <Routes />
    </Router>
  </React.Fragment>
}

export default App;
