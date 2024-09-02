import React, { useState, useEffect } from 'react';
import ActiveTab from './components/activeTabs';
import DashIndices from './components/dashIndices';
import TopMovers from './components/topMovers';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
    // Dynamic tab rendering 
    const [activeTab, setActiveTab] = useState(1); //change state back to 0
    const [activeStockTab, setActiveStockTab] = useState(0);
    const [indicesData, setIndicesData] = useState([]);
    const [gainersData, setGainersData] = useState([]);
    const [losersData, setLosersData] = useState([]);


    const tabs = [
        { label: 'Top Stocks' },
        { label: 'Indices' },
        { label: 'Currencies' }
    ];

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // console.log('fetching data');
            const response = await axios.get('/dashboard')
            // console.log('response received:', response);
            setIndicesData(response.data.indices);
            // console.log('indices data set:', response.data.indices);
            setGainersData(response.data.gainers);
            // console.log('gainers data set:', response.data.gainers);
            setLosersData(response.data.losers);
            // console.log('losers data set:', response.data.losers);
        } catch (error) {
            console.error('Error fetching indices data:', error);
        }
    };

    const indicesCurrency = (ticker) => {
        switch (ticker) {
            case '^GSPC':
            case '^IXIC':
            case '^RUT':
                return 'USD';
            case '^FTSE':
                return 'GBP';
            default:
                return '';
        }
    };

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
                                        <DashIndices
                                            key={i}
                                            index={index}
                                            currency={indicesCurrency(index.ticker)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>;
            case 2:
                return  <>
                            <div className="activeContentContainer" >
                                <div className='activeContent graphsLayout'>
                                    
                                    {/* {currencyData.map((index, i) => (
                                        <DashData
                                            key={i}
                                            title={index.title}
                                            ticker={index.ticker}
                                            currency={index.currency}
                                            data={index.data}
                                        />
                                    ))} */}
                                </div>
                            </div>
                        </>
        }
    };
    
    
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

    return  <>
                <div className='dashboard'>
                    <div className="dashFirst" >
                        {/* reusable activeTab component  */}
                        <ActiveTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                        
                            {renderMainTabContent()}    
                        
                    </div>
                    <div className='dashSecond'>
                        <div className='dashSecondA'>
                            <div className='secondATitle'> Winners </div>
                            <div className="moverContentContainer" >
                                <div className='moverContent graphsLayout'>
                                    {gainersData.map((index, i) => (
                                        <TopMovers
                                            key={i}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div  className='dashSecondB'>
                            <div className='secondBTitle'> Losers </div>
                            <div className="moverContentContainer" >
                                <div className='moverContent graphsLayout'>
                                    {losersData.map((index, i) => (
                                        <TopMovers
                                            key={i}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </div>
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
}

export default Dashboard;