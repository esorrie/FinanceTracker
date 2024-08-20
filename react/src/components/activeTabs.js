import React from 'react';
import PropTypes from 'prop-types';
import './activeTabs.css';

const ActiveTab = ({ tabs, activeTab, setActiveTab}) => {
    return (
        <div className="tabs-container" >
            {tabs.map((tab, index) => (
                <div
                key={index}
                className={`tab ${activeTab === index ? 'active-tab' : ''}`}
                onClick={() => setActiveTab(index)}
                >
                    {tab.label}
                </div>
            ))}
        </div>
    );
};

ActiveTab.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    activeTab: PropTypes.number.isRequired,
    setActiveTab: PropTypes.func.isRequired
};

export default ActiveTab;