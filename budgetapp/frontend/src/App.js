import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </ul>
        </nav>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Registration />} />
            <Route path="signup" element={<Registration />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
  
}


export default App;
