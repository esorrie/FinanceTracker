import React from "react";

const AllStocks = ({ stock }) => {
    const formatValue = (key, value) => {
        if (key === "volume") {
            return value.toLocaleString();
        } else if (key === "changePercentage") {
            return `${value.toFixed(2)}%`;
        } else if (typeof value === 'number' ) {
            return value.toFixed(2);
        }
        return value;
    };

    const dataOrder = [
        'price', 'prev_close', 'open', 'marketCap',
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
                <div className="graphLayout">
                    <div className="graphTitle">
                        {stock.name} ({stock.ticker}) - {stock.currency}
                    </div>

                    <div className="tableContent">
                        {dataOrder.map((key) => (
                            <div key={key} className="tr">
                                <div className="dataLabel"> {labelMap[key]} </div>
                                <div className="dataValue"> {formatValue(key, stock[key])} </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>

};

export default AllStocks;