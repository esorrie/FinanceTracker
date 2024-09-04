import React from "react";

const DashEtfs = ({ etf }) => {
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
            <div className="etfLayout">
                <div className="graphTitle">
                    {etf.name} ({etf.ticker})
                </div>

                <div className="etfContent">
                    {dataOrder.map((key) => (
                        <div key={key} className="tr">    
                            <div className="dataLabel"> {labelMap[key]} </div>
                            <div className="dataValue"> {formatValue(key, etf[key])} </div>
                        </div>
                    ))} 
                </div>
            </div> 
    
            </>
};

export default DashEtfs;