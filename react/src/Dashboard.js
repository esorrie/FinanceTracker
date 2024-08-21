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

    const renderMainTabContent = () => {
        switch(activeTab) {
            case 0:
                return  (
                    <div className='subTabs'>
                        <ActiveTab
                            tabs = {stockTabs}
                            activeTab={activeStockTab}
                            setActiveTab={setActiveStockTab}
                        />
                        {renderStockTabContent()}
                    </div>
                )
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

    const [activeStockTab, setActiveStockTab] = useState(0);

    const stockTabs = [
        { label: 'Big Tech' },
        { label: 'Big Pharma' },
        { label: 'Banks' }
    ]

    const renderStockTabContent = () => {
        switch(activeStockTab) {
            case 0:
                return  <div className="activeContent" >
                            <h1> This is big tech </h1>
                        </div>;
            
            case 1:
                return  <div className="activeContent" >
                            <h1> This is big Pharma </h1>
                        </div>;

            case 2:
                return  <div className="activeContent" >
                            <h1> This is Banks </h1>
                        </div>;
        }
    }
    
    return (
        <>
        <div className='dashboard'>
            <div className="dashFirst" >
                {/* reusable activeTab component  */}
                <ActiveTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                
                <div className="tabContent">
                    {renderMainTabContent()}    
                </div>
            </div>
            <div className='dashSecond'>
                <div className='dashSecondA'>
                    <h1 className='secondATitle'> Winners </h1>
                </div>
                <div  className='dashSecondB'>
                    <h1 className='secondBTitle'> Losers </h1>
                </div>
            </div>
            <div className='dashThird'>

            </div>
        </div>
        </>
    );
}

export default Dashboard;