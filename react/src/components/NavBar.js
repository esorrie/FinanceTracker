import { NavLink } from "react-router-dom";
import './NavBar.css';

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
                            {/* <img className="dashIcon" src="icons/dashboardicon.svg" /> */}
                            <div className="dash"> 
                                Dashboard
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/discover" style={{ textDecoration: 'none '}} >
                        <div className="nav-item">
                            {/* <img className="disc-icon"/> */}
                            <div className="disc">
                                Discover
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/favourites" style={{ textDecoration: 'none' }} >
                        <div className="nav-item-bottom">
                            {/* <img className="fav-icon"/> */}
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