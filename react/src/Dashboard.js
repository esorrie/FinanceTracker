import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Data from Flask:</h1>
      {error ? <p>Error: {error}</p> : 
        data ? <p>{data.message}</p> : 
        <p>Loading...</p>}
    </div>
  );
}

export default Dashboard;