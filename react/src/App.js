import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Stocks from './Stocks';
import NavBar from './components/NavBar';
import StockDetails from './StockDetails';
import './App.css';


const App = () => {
    return (
    <>
        <div className="pageLayout" style={{"height": "100%"}}>
            <NavBar />
            <div className="main">
                <Switch>
                    <Route exact path="/" render={() => {
                        return <Dashboard />;
                    }} />
                    
                    <Route exact path="/stocks" render={() => {
                        return <Stocks />;
                    }} />

                    <Route path="/stocks/:ticker" render={() => {
                        return <StockDetails />;
                    }} />

                </Switch>
            </div>
        </div>
    </>

    );
};

// // Debugging as Dashboard content doesn't load when called through App
// const App = () => {
//     return (
//         <div>
//             <NavBar />
//             <h2>Debug: App Component Rendered</h2>
//             <Switch>
//                 <Route exact path="/" render={() => {
//                     console.log("/ route matched");
//                     return <Dashboard />;
//                 }} />
//                 <Route path="*" render={() => <div>No route matched</div>} />
//             </Switch>
//         </div>
//     );
// };

export default App;