import React, { useState, useEffect } from 'react';
import ActiveTab from './components/activeTabs';
import DashData from './components/dashData';
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
    const [activeTab, setActiveTab] = useState(1); //change state back to 0

    const tabs = [
        { label: 'Top Stocks' },
        { label: 'Indices' },
        { label: 'Currencies' }
    ];

    const indicesData = [
        {
            title: "S&P 500 (GSPC)",
            currency: "USD",
            data: {
                "open ": 25000,
                "prev close ": 25000,
                "day range ": 25000,
                "52w range ": 25000,
                "volume ": 25000,
                "avg. volume": 30000
            }
        },
        {
            title: "NASDAQ (IXIC)",
            currency: "USD",
            data: {
                "open": 25000,
                "close": 25000,
                "day's range": 25000,
                "52w range": 25000,
                "prev close": 25000,
                "volume": 25000
            }
        },
        {
            title: "FTSE 100 (FTSE)",
            currency: "GBP",
            data: {
                "open": 25000,
                "close": 25000,
                "day's range": 25000,
                "52w range": 25000,
                "prev close": 25000,
                "volume": 25000
            }
        },
        {
            title: "RUSSEL 2000 (RUT)",
            currency: "USD",
            data: {
                "open": 25000,
                "close": 25000,
                "day's range": 25000,
                "52w range": 25000,
                "prev close": 25000,
                "volume": 25000
            }
        },
    ]

    const currencyData = [
        {
            title: "GBP/USD",
            currency: "GBP",
            data: {
                "open": 25000,
                "close": 25000,
                "day's range": 25000,
                "52w range": 25000,
                "prev close": 25000,
                "volume": 25000
            }
        },
    ]

    const renderMainTabContent = () => {
        switch(activeTab) {
            case 0:
                return  (
                    <>
                        <div className='subTabs'>
                            <ActiveTab
                                tabs = {stockTabs}
                                activeTab={activeStockTab}
                                setActiveTab={setActiveStockTab}
                                />
                        </div>
                        {renderStockTabContent()}
                    </>
                )
            case 1:
                return  <>
                            <div className="activeContentContainer" >
                                <div className='activeContent graphsLayout'>
                                    
                                    {indicesData.map((index, i) => (
                                        <DashData
                                            key={i}
                                            title={index.title}
                                            ticker={index.ticker}
                                            currency={index.currency}
                                            data={index.data}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>;
            case 2:
                return  <>
                            <div className="activeContentContainer" >
                                <div className='activeContent graphsLayout'>
                                    
                                    {currencyData.map((index, i) => (
                                        <DashData
                                            key={i}
                                            title={index.title}
                                            ticker={index.ticker}
                                            currency={index.currency}
                                            data={index.data}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
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
                return  <div className="stockContentContainer" >
                            <div className='stockActiveContent'> This is big tech </div>
                        </div>;
            
            case 1:
                return  <div className="stockContentContainer" >
                            <div className='stockActiveContent'> This is big Pharma </div>
                        </div>;

            case 2:
                return  <div className="stockContentContainer" >
                            <div className='stockActiveContent'> This is Banks </div>
                        </div>;
        }
    }

    return (
        <>
        <div className='dashboard'>
            <div className="dashFirst" >
                {/* reusable activeTab component  */}
                <ActiveTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                
                    {renderMainTabContent()}    
                
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
                <div className='dashThirdContent'>
                    <div className='thirdTitle'>
                        <h1>
                            ETF's    
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Dashboard;