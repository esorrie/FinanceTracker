import React from "react";
import { NavLink } from "react-router-dom";

const AllStocks = ({ stock }) => {
    const formatMktcap = (value) => {
        if (value>= 1e12) {
            return `${(value / 1e12).toFixed(1)}T`;
        } else if (value>= 1e9) {
            return `${(value / 1e9).toFixed(1)}B`;
        } else if (value>= 1e6) {
            return `${(value / 1e6).toFixed(1)}M`;
        } else {
            return value.toLocaleString();
        }
    };

    const formatValue = (key, value) => {
        if (key === "volume") {
            return value.toLocaleString();
        } else if (key === "avg_volume"){
            return value.toLocaleString();
        } else if (key === "changePercentage") {
            return `${value.toFixed(2)}%`;
        } else if (key === 'marketCap') {
            return formatMktcap(value);
        } else if (typeof value === 'number' ) {
            return value.toFixed(2);
        } 
        return value;
    };

    const dataOrder = [
        'price', 'open', 'prev_close', 'marketCap',
        'dayLow', 'dayHigh', 'changePercentage',
        'volume', 'avg_volume', 
        
    ];

    const labelMap = {
        price: 'Price',
        marketCap: 'Mkt Cap',
        prev_close: 'Prev Close',
        open: 'Open',
        volume: 'Volume',
        avg_volume: 'Avg Volume',
        dayLow: 'Day Low',
        dayHigh: 'Day High',
        changePercentage: 'Change %'
    }

    return  <>
                <div className="stockLayout">
                    <div className="stockTitle">
                        <NavLink to={`/stocks/${stock.ticker}`}style={{ textDecoration: 'none' }}>
                            {stock.name} ({stock.ticker}) - {stock.currency}
                        </NavLink>
                    </div>
                    <div className="tableStockContent">
                        {dataOrder.map((key) => (
                            <div key={key} className="trStocks">
                                <div className="stockLabel"> {labelMap[key]} </div>
                                <div className="stockValue"> {formatValue(key, stock[key])} </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>

};

export default AllStocks;