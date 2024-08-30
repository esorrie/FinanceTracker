import React from "react";

const DashIndices = ({ index, currency }) => {
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
        'price', 'open', 'prev_close', 'dayRange', 
        'yearRange', 'changePercentage', 'volume',
    ];

    const labelMap = {
        price: 'Price',
        open: 'Open',
        prev_close: 'Prev Close',
        dayRange: 'Day Range',
        yearRange: '52 Week Range',
        volume: 'Volume',
        changePercentage: 'Change %'
    };

    return  <>
                <div className="graphLayout">
                    <div className="graphTitle">
                        {index.name} ({index.ticker}) - {currency}
                    </div>

                    <div className="tableContent">
                        {dataOrder.map((key) => (
                            <div key={key} className="tr">    
                                <div className="dataLabel"> {labelMap[key]} </div>
                                <div className="dataValue"> {formatValue(key, index[key])} </div>
                            </div>
                        ))} 
                    </div>
                </div> 
            </>
};

export default DashIndices;