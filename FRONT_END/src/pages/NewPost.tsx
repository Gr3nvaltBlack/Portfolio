import './newpost.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import type rootReducer from "../redux/reducers/rootReducer";
import { isEmpty } from "../hooks/verifData";
import { SlPicture } from "react-icons/sl";
import { TiDeleteOutline } from "react-icons/ti";
import { TbCameraCancel } from "react-icons/tb";
import type { AppDispatch } from "../redux/store";
import { addPost, getPosts } from "../actions/post.action";


const NewPost = () => {
    const [isLoading, setisLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [picture, setPicture] = useState<string | null>(null);
    const [file, SetFile] = useState<File | null>(null);
    const userData = useSelector((state: ReturnType<typeof rootReducer>) => state.userReducer)
    // const error = useSelector((state: ReturnType<typeof rootReducer>) => state.errorReducer)
    const dispatch = useDispatch<AppDispatch>();
    // const [video, setVideo] = useState(null);

    const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPicture(URL.createObjectURL(e.target.files[0]));
            SetFile(e.target.files[0])
        }
    };

    const handlePost = async () => {
        if (message || picture) {
            const dataPost = new FormData();
            dataPost.append('posterId', userData._id);
            dataPost.append('message', message);
            if (file) dataPost.append('file', file)

            await dispatch(addPost(dataPost));
            // Sync ours posts
            dispatch(getPosts(5));
            cancelPost();
        } else {
            alert("Please enter content")
        }
    };

    const cancelPost = () => {
        setMessage("");
        setPicture(null);
        SetFile(null);
    };

    useEffect(() => {
        if (!isEmpty(userData)) setisLoading(false)
    }, [userData])

    return (
        <>
            <div className="new-post-container">
                {isLoading ? (
                    <i className="fas fa-spinner fa-pulse"></i>
                ) : (
                    <>
                        <div className="data-form">
                            <div className="form-user-info">
                                <img src={userData.picture} alt="user-picture" />
                                <NavLink to={"/profile"}>
                                    <span>{userData.pseudo}</span>
                                </NavLink>
                            </div>
                            <div className="post-form">
                                <textarea
                                    name="message"
                                    id="message"
                                    placeholder="Express your creativity..."
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                />
                                {message || picture ? (
                                    <li className="card-container">
                                        <div className="card-user">
                                            <img src={userData.picture} alt="User-pic" />
                                            <div className="name-date-user">
                                                <h4>{userData.pseudo}</h4>
                                                <p>{new Date().toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="content-message">
                                            <p>{message}</p>
                                            {picture && <img src={picture} alt="post-picture" />}
                                        </div>
                                    </li>
                                ) : null}
                                <div className="footer-form">
                                    <div className="footer-icon">
                                        {isEmpty(picture) && (
                                            <>
                                                <SlPicture className='SlPicture'/>
                                                <input
                                                    type="file"
                                                    name="file"
                                                    id="file-upload" 
                                                    onChange={(e) => handlePicture(e)}
                                                />
                                            </>
                                        )}
                                        {picture && (
                                            <button onClick={() => setPicture(null)} className='TbCameraCancel'>
                                                <TbCameraCancel />
                                            </button>
                                        )}
                                    </div>
                                    {/* {!isEmpty(error.format)} */}
                                    <div className="btn-execut">
                                        {message || picture ? (
                                        <button className="btn-cancel" onClick={cancelPost}>
                                            <TiDeleteOutline />
                                        </button>
                                        ) : null}
                                        <button className="btn-send" onClick={handlePost}>Publier</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
};

export default NewPost;