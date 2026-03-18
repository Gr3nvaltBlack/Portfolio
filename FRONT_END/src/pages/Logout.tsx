import Cookies from "js-cookie"
import { GiExitDoor } from "react-icons/gi";
import { LogOutUser } from "../services/authService"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from '../redux/store.ts';
import { logoutUser } from "../actions/user.actions.ts";

const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const logout = async () => {
        try {
            try {
                await LogOutUser();
            } catch {
                // pass
            }

            dispatch(logoutUser());
            Cookies.remove("jwt")
            navigate('/login')
            
            return
        } catch (error) {
            console.log(error);
            return error
        }
    };

    return (
        <>
        <button className="button_nav" onClick={logout}>
            <GiExitDoor size={28} />
        </button>
        </>
    );
};
export default Logout