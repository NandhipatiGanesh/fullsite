import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard () {
    const navigate = useNavigate();
    const [isLoggedOut, setIsLoggedOut] = useState(false);
   
    const userEmail = localStorage.getItem('userEmail');
    const handleLogout = () => {
        // Perform any necessary cleanup or API calls here
        // For example, you might want to clear local storage or send a logout request to the server
    
        // Update state to indicate logout
        setIsLoggedOut(true);
    
        // Redirect to the login page
        navigate('/login');
      };
      if (isLoggedOut) {
        return null; // You can return a loading indicator or any other UI while logging out
      }

    return (
        <>
    <div>
        <h2> Welcome, {userEmail}!</h2>
    </div>
    <div>
    <button onClick={handleLogout}>Logout</button>
    </div>
    </>
    )
}
export default Dashboard;