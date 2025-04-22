import React, { useState, useEffect } from 'react';
import ActiveTab from './components/activeTabs';
import DashIndices from './components/dashIndices';
import TopMovers from './components/topMovers';
import DashEtfs from './components/dashEtfs';
import MarketSection from './components/MarketSection';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
    // Dynamic tab rendering 
    const [activeTab, setActiveTab] = useState(1); //change state back to 0
    const [activeStockTab, setActiveStockTab] = useState(0);

    const[marketData, setMarketData] = useState({
        indices: [],
        gainers: [],
        losers: [],
        etfs: [],
    });

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
            const response = await axios.get('/dashboard');
            // console.log('response received:', response);
            setMarketData({
                // console.log('indices data set:', response.data.indices);
                indices: response.data.indices,
                // console.log('gainers data set:', response.data.gainers);
                gainers: response.data.gainers,
                // console.log('losers data set:', response.data.losers);
                losers: response.data.losers,
                // console.log('losers data set:', response.data.etfs);
                etfs: response.data.etfs
            });
        } catch (error) {
            console.error('Error fetching data:', error);
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
                                    
                                    {marketData.indices.map((index, i) => (
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
                            <MarketSection 
                                title="Winners"
                                titleClassName='secondATitle'
                                data={marketData.gainers}
                                containerClassName='moverContentContainer'
                                contentClassName='moverContent'
                                renderItem={(mover, i) => (
                                    <TopMovers 
                                        key={i} 
                                        mover={mover} />
                                )}
                            />
                        </div>
                        <div  className='dashSecondB'>
                            <MarketSection 
                                title="Losers"
                                titleClassName='SecondBTitle'
                                data={marketData.losers}
                                containerClassName='moverContentContainer'
                                contentClassName='moverContent'
                                renderItem={(mover, i) => (
                                    <TopMovers 
                                        key={i} 
                                        mover={mover} 
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className='dashThird'>

                            <MarketSection
                                title="ETF"
                                titleClassName='thirdTitle'
                                data={marketData.etfs}
                                containerClassName='etfContentContainer'
                                contentClassName='dashThirdContent'
                                renderItem={(etf, i) => (
                                    <DashEtfs
                                    key={i}
                                    etf={etf} 
                                    />
                                )}
                            />

                    </div>
                </div>
            </>
}
export default Dashboard;