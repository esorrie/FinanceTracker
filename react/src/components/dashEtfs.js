import React from "react";

const DashEtfs = ({ index }) => {
    const formatValue = (key, value) => {
        if (key === "price") {
            return value.toFixed(2);
        }
        return value;
    };

    const dataOrder = [
        'price'
    ];

    const labelMap = {
        price: 'price'
    };

    return <>
            <div className="graphLayout">
                <div className="graphTitle">
                    {index.name} ({index.ticker})
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

export default DashEtfs;