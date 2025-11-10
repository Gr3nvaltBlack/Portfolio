import './navbar.css'
import { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { UidContext } from '../context/AuthContext';
import { GiExitDoor } from "react-icons/gi";
import Logout from '../pages/Logout';
import { useSelector } from 'react-redux';
import rootReducer from '../redux/reducers/rootReducer';


const Navbar = () => {
    const uid = useContext(UidContext);
    const userdata = useSelector((state: ReturnType<typeof rootReducer>) => state.userReducer);

    return (
        <>
        <nav>
            <div className="nav-container">
                <div className="nav-logo">
                    <NavLink end to={"/"}>
                        <div className="logo-icon">
                            <img src="/NetFeed.png" alt="Netfeed icon" />
                            <h2>NETFEED</h2>
                        </div>
                    </NavLink>
                </div>
                <div className='nav-right'>
                {uid ? (
                    <>
                        <NavLink end to={"/profile"}>
                            <h3>
                                Welcome {userdata.pseudo||'User'}!
                            </h3>
                        </NavLink>
                        <Logout />
                    </>
                ) : (
                    <ul>
                        <li>
                            <NavLink end to={"/login"}>
                                <GiExitDoor className='logout-icon'/>
                            </NavLink>
                        </li>
                    </ul>
                )}
                </div>
            </div>
        </nav>
        </>
    );
};

export default Navbar