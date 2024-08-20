import React, { useState, useEffect } from 'react';
import ActiveTab from './components/activeTabs';
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
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { label: 'Top Stocks' },
        { label: 'Indexes' },
        { label: 'Currencies' }
    ];

    const renderTabContent = () => {
        switch(activeTab) {
            case 0:
                return  <div className="activeContent" >
                            <h1>Data from Flask:</h1>
                                {error ? <p>Error: {error}</p> : 
                                data ? <p>{data.message}</p> : 
                                <p>Loading...</p>}
                        </div>;
            case 1:
                return  <div className="activeContent" >
                            <h1> Indexes </h1>
                        </div>;
            case 2:
                return  <div className="activeContent" >
                            <h1> Currency </h1> 
                        </div>;
        }
    };

    return (
        <>
        <div>
            <div className="dashFirst" >
                {/* reusable activeTab component  */}
                <ActiveTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                
                <div className="tabContent">
                    {renderTabContent()}    
                </div>
            </div>
        </div>
        </>
    );
}

export default Dashboard;