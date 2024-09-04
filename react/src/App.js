import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Stocks from './Stocks';
import NavBar from './components/NavBar';
import './App.css';


const App = () => {
    return (
    <>
        <div className="pageLayout" style={{"height": "100%"}}>
            <NavBar />
            <div className="main">
                <Switch>
                    <Route exact path="/" render={() => {
                        // console.log("/ route matched");
                        return <Dashboard />;
                    }} />
                    {/* <Route path="/stocks" render={() => {
                        console.log("/ route matched");
                        return <Favourites />;
                    }} /> */}
                    <Route path="/stocks" render={() => {
                        // console.log("/ route matched");
                        return <Stocks />;
                    }} />
                    {/* <Route path="/Indices" render={() => {
                        console.log("/ route matched");
                        return <Indices />;
                    }} />
                    <Route path="/currencies" render={() => {
                        console.log("/ route matched");
                        return <Currencies />;
                    }} /> */}
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