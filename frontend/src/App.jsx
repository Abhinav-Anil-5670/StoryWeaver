import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WriterStudio from './pages/WriterStudio';

import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans">
        {/* Navbar is global */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editor/:id" element={<WriterStudio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
