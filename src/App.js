import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import WelcomePage from './components/WelcomePage';
import MedicApp from './components/Medic/MedicApp';
import FamilyApp from './components/family/FamilyApp';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PatientApp />} />
          <Route path="/medic" element={<MedicApp />} />
          <Route path="/family" element={<FamilyApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function PatientApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = (user, type) => {
    setIsLoggedIn(true);
    setUserType(type);
    setUsername(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
    setUsername('');
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <WelcomePage 
          username={username} 
          userType={userType} 
          onLogout={handleLogout} 
        />
      )}
    </>
  );
}

export default App;