import React, { useState } from 'react';
import MedicLogin from './MedicLogin';
import MedicDashboard from './MedicDashboard';

function MedicApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctor, setDoctor] = useState(null);

  const handleLogin = (doctorData) => {
    console.log('MedicApp - handleLogin called with:', doctorData);
    setIsLoggedIn(true);
    setDoctor(doctorData);
  };

  const handleLogout = () => {
    console.log('MedicApp - handleLogout called');
    setIsLoggedIn(false);
    setDoctor(null);
  };

  console.log('MedicApp - Current state:', { isLoggedIn, doctor });

  return (
    <div className="medic-app">
      {!isLoggedIn ? (
        <MedicLogin onLogin={handleLogin} />
      ) : (
        <MedicDashboard doctor={doctor} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default MedicApp;