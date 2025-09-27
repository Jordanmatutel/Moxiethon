import React, { useState } from 'react';
import FamilyLogin from './FamilyLogin';
import FamilyDashboard from './FamilyDashboard';

function FamilyApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [familyMember, setFamilyMember] = useState(null);

  const handleLogin = (memberData) => {
    setIsLoggedIn(true);
    setFamilyMember(memberData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFamilyMember(null);
  };

  return (
    <div className="family-app">
      {!isLoggedIn ? (
        <FamilyLogin onLogin={handleLogin} />
      ) : (
        <FamilyDashboard familyMember={familyMember} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default FamilyApp;