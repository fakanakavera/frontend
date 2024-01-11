import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopBar = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axios.get('http://localhost:8000/auth/get_user_email', {
        headers: {
          'Authorization': `Bearer ${token}`  // Adjust the header according to your auth scheme
        }
      })
      .then(response => {
        setEmail(response.data.email);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, []);

  return (
    <div className="top-bar">
      {email ? <p>Welcome, {email}</p> : <p>Please log in</p>}
    </div>
  );
};

export default TopBar;
