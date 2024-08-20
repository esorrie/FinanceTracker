import { NavLink } from "react-router-dom";
import './NavBar.css';
import DashIcon from "../icons/dashboardicon.svg";
import DiscIcon from "../icons/discovericon.svg";
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
                    <NavLink to="/discover" style={{ textDecoration: 'none '}} >
                        <div className="nav-item">
                            <img className="discIcon" src={DiscIcon} />
                            <div className="disc">
                                Discover
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
                    
                </nav>
            
            </div>
        </>
    );
};

export default NavBar;