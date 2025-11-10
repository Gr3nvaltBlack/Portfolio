import { useContext, useEffect, useState } from "react";
import { UidContext } from "../context/AuthContext";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../actions/post.action";
import type { AppDispatch } from "../redux/store";

type Post = {
  _id: string;
  message: string;
  likers: string[];
};

type LikeButtonProps = {
    post: Post;
};

const LikeButton: React.FC<LikeButtonProps> = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch<AppDispatch>();

    const like = () =>{
        if (!uid) return 
        dispatch(likePost(post._id, uid))
        setLiked(true)
    };

    const unlike = () =>{
        if (!uid) return
        dispatch(unlikePost(post._id, uid))
        setLiked(false);
    };

    useEffect(() => {
        if (uid && post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [post.likers, uid])
    return (
        <>
            <div className="like-container">
                {uid === null && (
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
                {uid && liked === false && (
                    <FaRegHeart onClick={like}/>
                )}
                {uid && liked && (
                    <FaHeart style={{ color: "red" }} onClick={unlike}/>
                )}
                <span>{post.likers.length}</span>
            </div>
        </>
    );
};

export default LikeButton;