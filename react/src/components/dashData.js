import React from "react";

const DashData = ({ title, ticker, currency, data }) => {
    return (
        <div className="graphLayout">
            <div className="graphTitle">
                {title} {ticker} ({currency})
            </div>

            <div className="tableContent">
                {Object.entries(data).map((label, value) => (
                    <div key={label} className='tr' >
                        <div className="dataLabel"> {label} </div>
                        <div className="dataValue"> {value} </div>
                    </div>
                ))}
            </div>
        </div> 
    );
};

export default DashData;