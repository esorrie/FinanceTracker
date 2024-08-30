import React from "react";

const TopMovers = ({ index }) => {
    const formatValue = (key, value) => {
        if (key === "changePercentage") {
            return `${value.toFixed(2)}`;
        } else if (typeof value === 'number' ) {
            return value.toFixed(2);
        }
        return value;
    };

    const dataOrder = [
        'price', 'change', 'changePercentage'
    ];

    const labelMap = {
        price: 'price',
        change: 'change',
        changePercentage: 'changePercentage'
    };

    return  <>
                <div className="moverLayout">
                    <div className="graphTitle">
                        {index.name} ({index.ticker})
                    </div>

                    <div className="tableContent">
                        {dataOrder.map((key) => (
                            <div className="tr">
                                <div className="dataLabel"> {labelMap[key]} </div>
                                <div className="dataValue"> {formatValue(key, index[key])} </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
};

export default TopMovers;