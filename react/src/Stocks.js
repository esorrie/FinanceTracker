import React, { useState, useEffect } from 'react';
import AllStocks from './components/allStocks';
import Pagination from './components/Pagination';
import axios from 'axios';
import './Stocks.css';

function Stocks() {
    const [stockData, setStockData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchStockData(currentPage);
    }, [currentPage]);

    const fetchStockData = async (page) => {
        try {
            // console.log('fetching stock data');
            const response = await axios.get(`/stocks?page=${page}`);
            setStockData(response.data.stocks);
            setTotalPages(response.data.pages);
            // console.log('stocks response received:', response);
            // console.log('stock data set:', response.data.indices);
        } catch (error) {
            console.error('Error fetching stocks data:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className='stocks'>
                <div className='stockContainer'>
                    <div className='stockMain'>
                        <div className='stockMainBar'>  
                            <div className='pageTitle'> Stocks </div>
                            <div className='pagination-container'>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                            <div> Search Bar </div>
                        </div>
                        <div>
                            {stockData.map((stock, s) => (
                                <AllStocks
                                key={s}
                                stock={stock}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Stocks;