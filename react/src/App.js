import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';


const App = () => {
    return (
        <>
        <Switch>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/stocks" element={<Stocks />} /> */}
        </Switch>
        </>
    );
};

export default App;