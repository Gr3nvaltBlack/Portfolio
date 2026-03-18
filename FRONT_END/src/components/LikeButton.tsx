import { useContext, useEffect, useState } from "react";
import { UidContext } from "../context/AuthContext";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../actions/post.action";
import type { AppDispatch } from "../redux/store";
import type rootReducer from "../redux/reducers/rootReducer";

type Post = {
  _id: string;
  message: string;
  likers: string[];
};

type LikeButtonProps = {
    post: Post;
};

const LikeButton: React.FC<LikeButtonProps> = ({ post }) => {
    const [count, setCount] = useState(post.likers.length);
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: ReturnType<typeof rootReducer>) => state.userReducer)

    const like = () =>{
        if (!user || !user._id) return
        dispatch(likePost(post._id))
        setLiked(true)
        setCount((prev) => prev + 1)
    };

    const unlike = () =>{
        if (!user || !user._id) return
        dispatch(unlikePost(post._id))
        setLiked(false);
        setCount((prev) => prev - 1)
    };

    useEffect(() => {
        if (user && user._id && post.likers.includes(user._id)) setLiked(true);
        else setLiked(false);
    }, [post.likers, user]);

    return (
        <>
            <div className="like-container">
                {!user || !user._id === null && (
                    <Popup
                        trigger={<FaRegHeart />}
                        position={['bottom center', "bottom left"]}
                        closeOnDocumentClick
                    >
                        <div className="popup-message">
                            <p>You must be logged in to like this post!</p>
                        </div>
                    </Popup>
                )}
                {user && user._id && liked === false && (
                    <span onClick={like}><FaRegHeart size={25} /></span>
                )}
                {user && user._id && liked && (
                    <FaHeart size={25} style={{ color: "red" }} onClick={unlike}/>
                )}
                <span>{count}</span>
            </div>
        </>
    );
};

export default LikeButton;