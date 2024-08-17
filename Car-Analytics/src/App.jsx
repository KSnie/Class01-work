import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Highlighted from './pages/Highlighted';

function App() {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/highlighted" element={<Highlighted />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
