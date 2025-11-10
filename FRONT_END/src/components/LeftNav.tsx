import './navbar.css'
import { GoBook } from "react-icons/go";
import { SlFire } from "react-icons/sl";
import { CiStar } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineAddBox } from "react-icons/md";

type MyComponentProps = {
    className?: string;
};

const LeftNav: React.FC<MyComponentProps> = ({ className }) => {
    return (
        <>
        <div className={className}>
            <div className="left-nav-container">
                <nav className="left-center-container">
                    <NavLink to={"/trend"} className="left-nav-link">
                        <button>
                            <SlFire />
                            <span>Trending</span>
                        </button>
                    </NavLink>

                    <NavLink to={"/recipe"} className="left-nav-link">
                        <button>
                            <GoBook />
                            <span>Recipes</span>
                        </button>
                    </NavLink>

                    <NavLink to={"/Favorite"} className="left-nav-link">
                        <button>
                            <CiStar />
                            <span>Favorites</span>
                        </button>
                    </NavLink>

                    <NavLink to={"/profile"} className="left-nav-link">
                        <button>
                            <FiUser />
                            <span>Profile</span>
                        </button>
                    </NavLink>

                    <NavLink to={"/new-post"} className="left-nav-link">
                        <button>
                            <MdOutlineAddBox />
                            <span>Publications</span>
                        </button>
                    </NavLink>
                    
                    <NavLink to={"/message"} className="left-nav-link">
                        <button>
                            <TbMessageCircle />
                            <span>Message</span>
                        </button>
                    </NavLink>
                </nav>
            </div>
        </div>
        </>
    );
};

export default LeftNav;