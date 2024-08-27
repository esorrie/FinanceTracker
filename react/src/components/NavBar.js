import { NavLink } from "react-router-dom";
import './NavBar.css';
import DashIcon from "../icons/dashboardicon.svg";
// import stockIcon from "../icons/stockicon.svg";
// import indexIcon from "../icons/indexicon.svg";
// import currIcon from "../icons/curricon.svg";
import FavIcon from "../icons/favouritesicon.svg";

const NavBar = () => {

    
    return (
        <>
            <div className="navbar-main">

                <div className="navbar-title">
                    SHARESCANNER
                </div>
            
                <nav className="navbar-content">
                    <NavLink to="/" style={{ textDecoration: 'none' }} >
                        <div className="nav-item-top">
                            <img className="dashIcon" src={DashIcon} />
                            <div className="dash"> 
                                Dashboard
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/favourites" style={{ textDecoration: 'none' }} >
                        <div className="nav-item-bottom">
                            <img className="favIcon" src={FavIcon} />
                            <div className="fav">
                                Favourites
                            </div>
                        </div>
                    </NavLink>
                    
                    {/* TODO: change icon to represent Stocks */}
                    <NavLink to="/stocks" style={{ textDecoration: 'none '}} >
                        <div className="nav-item">
                            {/* <img className="stockIcon" src={stockIcon} /> */}
                            <div className="stock">
                                Stocks
                            </div>
                        </div>
                    </NavLink>
                    {/* TODO: change icon to represent Indices */}
                    <NavLink to="/indices" style={{ textDecoration: 'none '}} >
                        <div className="nav-item">
                            {/* <img className="indexIcon" src={indexIcon} /> */}
                            <div className="index">
                                Indices
                            </div>
                        </div>
                    </NavLink>
                    {/* TODO: change icon to represent Currencies */}
                    <NavLink to="/currencies" style={{ textDecoration: 'none '}} >
                        <div className="nav-item">
                            {/* <img className="currIcon" src={currIcon} /> */}
                            <div className="curr">
                                Currencies
                            </div>
                        </div>
                    </NavLink>
                </nav>
            
            </div>
        </>
    );
};

export default NavBar;