import Cookies from "js-cookie"
import { GiExitDoor } from "react-icons/gi";
import { LogOutUser } from "../services/authService"
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate()

    const removeCookie = (key: string) => {
        if (window  !== undefined) {
            Cookies.remove(key, { expires: 1 });
        }
    };

    const logout = async () => {
        try {
            await LogOutUser();
            removeCookie('jwt')

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