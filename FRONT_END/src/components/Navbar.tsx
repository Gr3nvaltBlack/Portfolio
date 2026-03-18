import './navbar.css'
import { NavLink } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import Logout from '../pages/Logout';
import { useSelector } from 'react-redux';
import rootReducer from '../redux/reducers/rootReducer';


const Navbar = () => {
    const user = useSelector((state: ReturnType<typeof rootReducer>) => state.userReducer);

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
                {user && user._id ? (
                    <>
                        <NavLink end to={"/profile"}>
                            <h3>
                                Welcome {user.username||'User'}!
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