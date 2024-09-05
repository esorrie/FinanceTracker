import React from 'react';
import './StockDetails.css';
import { useParams } from 'react-router-dom';

const StockDetails = () => {
    const { ticker } = useParams();

    return (
        <div className='stockDetails'>
            <div className='stockDetailsContainer'>
                <div className='stockDetailsMain'>
                    <div className='stocksTitle'>Stock Details for {ticker}</div>
                    <div className='stockDetailsGraph'></div>
                </div>
                <div className='stockDetailsSecond'>
                    <div className='stockDetailsDataTitle'>
                        Data
                    </div>
                    <div className='stockDetailsData'>
                        
                    </div>
                </div>
                <div className='stockDetailsThird'>
                    <div className='stockDetailsBidTitle'>
                        Bid Ask
                    </div>
                    <div className='stockDetailsBid'>
                        
                    </div>
                </div>
                <div className='stockDetailsFourth'>
                    <div className='stockDetailsNewsTitle'>
                        News
                    </div>
                    <div className='stockDetailsNews'>

                    </div>
                </div>
                <div className='stockDetailsFifth'>
                    <div className='stockDetailsDividendTitle'>
                        Dividends
                    </div>
                    <div className='stockDetailsDividend'>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockDetails;