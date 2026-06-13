import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import CurrentStatus from './components/CurrentStatus';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/current-status" element={<CurrentStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
