import { useState } from "react";
import { formatDate } from "../hooks/useDates";
import { BiCommentDetail } from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";
import LikeButton from "./LikeButton";
import { MdSaveAlt } from "react-icons/md";
import CardComment from "./Comment";

import "./postCard.css"
import { useSelector } from "react-redux";
import type rootReducer from "../redux/reducers/rootReducer";
import FollowHandle from "./Follow.Handle";

const PostCard = ({ post }: { post: any }) => {
    const [showComment, setshowComment] = useState(false)
    const userData = useSelector((state: ReturnType<typeof rootReducer>) => state.userReducer);
    return (
        <div className="card-container">
            <div className="card-header">
                <img
                    src={post.userId.profilePic 
                            || 
                        "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"}
                    alt="Profile"
                    style={{
                        width: "50px",
                        height: "50px"
                    }}
                />
                <div className="card-header_top">
                    <h3>
                        {post.userId.username}
                    </h3>
                    <span>{formatDate(post.createdAt)}</span>
                {post.userId._id !== userData._id && (
                    <FollowHandle idToFollow={post.userId._id} typeTofollow={"card"} /> 
                )}
                </div>
            </div>
            <p>{post.content}</p>
            {post.media &&
                <div className="card-image">
                    <img src={`${import.meta.env.VITE_API_URL}uploads/${post.media}`} alt="card-picture" className="card-picture" />
                </div>
            }
            {/* {post.video && <iframe></iframe>} */}
            <div className="card-footer">
                <div className="footer-center">
                    <div className="left-button">
                        <button>
                            <LikeButton post={post}/>
                        </button>
                        <button onClick={() => setshowComment(!showComment)}>
                            <BiCommentDetail size={25} />
                            <span>{post.comments.length}</span>
                        </button>
                        <button>
                            <CiShare2 size={25} />
                        </button>
                    </div>
                    <button className="right-button">
                        <MdSaveAlt size={25} />
                    </button>
                   
                </div>
                 {showComment && <CardComment post={post} />}
            </div>
        </div>
    );
};

export default PostCard;