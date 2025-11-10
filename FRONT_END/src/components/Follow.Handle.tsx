import { useDispatch, useSelector } from "react-redux";
import rootReducer from '../redux/reducers/rootReducer';
import { useEffect, useState } from "react";
import { isEmpty } from "../hooks/verifData";
import type { AppDispatch } from "../redux/store";
import { followUser, unfollowUser } from "../actions/user.actions";
import { MdOutlineCheckCircle } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

type FollowHandleProps = {
  idToFollow: string;
  typeTofollow: string;
};


const FollowHandle: React.FC<FollowHandleProps> = ({ idToFollow, typeTofollow }) => {
    const userData = useSelector((state: ReturnType<typeof rootReducer>) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    };

    const handleUnFollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollowed(false);
    };

    useEffect(() =>{
        if (!isEmpty(userData.following)) {
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            }
        } else {
            setIsFollowed(false)
        }
    }, [userData, idToFollow])

    return (
        <>
            {isFollowed && !isEmpty(userData) && (
            <span onClick={handleUnFollow}>
                {typeTofollow === "suggestion" && 
                <button className="unfollow-btn">unfollow</button>}
                {typeTofollow === "card" && <MdOutlineCheckCircle/>}
            </span>
            )}
            {isFollowed === false && !isEmpty(userData) && (
            <span onClick={handleFollow}>
                {typeTofollow === "suggestion" &&
                <button className="follow-btn">follow</button>}
                {typeTofollow === "card" && <MdCheckCircle/>}
            </span>
            )}
        </>
    );
};

export default FollowHandle;