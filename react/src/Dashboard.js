import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/dashboard')
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

    // Dynamic tab rendering 
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
      console.log(index);
    }
  return (
    <>
      {/* <div>
        <h1>Data from Flask:</h1>
        {error ? <p>Error: {error}</p> : 
          data ? <p>{data.message}</p> : 
          <p>Loading...</p>}
      </div> */}
      <div>
        <div className="dashFirst" >
          <div className="dashFirstTabs" >
            <div className= {toggleState === 1 ? "dashFirstStocks cursorDefault active-tab" : "dashFirstStocks" } onClick={() => toggleTab(1) } >
              Top Stocks
            </div>
            <div className= {toggleState === 2 ? "dashFirstIndexes cursorDefault active-tab" : "dashFirstIndexes" } onClick={() => toggleTab(2) } >
              Indexes
            </div>
            <div className= {toggleState === 3 ? "dashFirstCurrency cursorDefault active-tab" : "dashFirstCurrency" } onClick={() => toggleTab(3) } >
              Currencies
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;