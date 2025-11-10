import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type rootReducer from "../redux/reducers/rootReducer";
import { isEmpty } from "../hooks/verifData";
import { formatDate } from "../hooks/useDates";
import FollowHandle from "./Follow.Handle";
import { BiCommentDetail } from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";
import LikeButton from "./LikeButton";
import { MdSaveAlt } from "react-icons/md";
import CardComment from "./Comment";

const PostCard = ({ post }: { post: any }) => {
    const [isLoading, setIsLoading] =useState(true)
    const userData = useSelector((state: ReturnType<typeof rootReducer>) => state.userReducer)
    const usersData = useSelector((state: ReturnType<typeof rootReducer>) => state.usersReducer)
    const [showComment, setshowComment] = useState(false)

    useEffect(() => {
        !isEmpty(usersData[0] && setIsLoading(false))
    }, [usersData])

    // const user = usersData.map((user: any) => {
    //                                         if (user._id === post.posterId) return user.picture;
    //                                     }).join('')
    let user = null;
    for (const _user of usersData) {
        if (_user._id == post.posterId) {
            user = _user;
            break;
        }
    }

    if (!user) return <>User not found</>

    return (
        <>
            <li className="card-container" key={post._id}>
                {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                ) : (
                    <div className="card-container">
                        <div className="card-header">
                            <img
                                src={user.picture}
                                alt="poster-pic"
                            />
                            <h3>
                                {user.pseudo}
                            </h3>
                            {post.posterId !== userData._id && (
                                <FollowHandle idToFollow={post.posterId} typeTofollow={"card"} /> 
                            )}
                            <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <p>{post.message}</p>
                        {post.picture &&
                        <img src={post.picture} alt="card-picture" className="card-picture" />}
                        {/* {post.video && <iframe></iframe>} */}
                        <div className="card-footer">
                            <div className="footer-center">
                                <div className="left-button">
                                    <button>
                                        <LikeButton post={post}/>
                                    </button>
                                    <button onClick={() => setshowComment(!setshowComment)}>
                                        <BiCommentDetail />
                                        <span>{post.comments.length}</span>
                                    </button>
                                    <button>
                                        <CiShare2 />
                                    </button>
                                </div>
                                <button>
                                    <MdSaveAlt />
                                </button>
                                {showComment && <CardComment post={post} />}
                            </div>
                        </div>
                    </div>
                )}
            </li>
        </>
    );
};

export default PostCard;