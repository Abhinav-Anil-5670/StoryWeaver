import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import WriterStudio from './pages/WriterStudio';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function AppContent() {
  const location = useLocation();
  // Hide Navbar on Auth pages AND Landing Page (Landing page has its own footer/header structure usually, or we can keep it?)
  // Let's keep the Navbar for the Landing Page but style it differently? 
  // For simplicity and "Product" feel, usually the main app navbar is different.
  // Let's hide the APP navbar on the landing page, and let the Landing Page have its own internal header if needed, OR adaptable navbar.
  // Actually, keeping the Navbar on the Landing page is good for consistency, just need to change buttons.
  // Let's hide it for now and let LandingPage handle its own simple header if needed, or better yet, make Navbar adaptable.
  // Decision: Adapt Navbar.
  const hideNavbar = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor/:id" element={<WriterStudio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
