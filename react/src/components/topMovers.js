import React from "react";

const TopMovers = ({ mover }) => {
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
                        {mover.name} ({mover.ticker})
                    </div>

                    <div className="tableContent">
                        {dataOrder.map((key) => (
                            <div className="tr">
                                <div className="dataLabel"> {labelMap[key]} </div>
                                <div className="dataValue"> {formatValue(key, mover[key])} </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
};

export default TopMovers;