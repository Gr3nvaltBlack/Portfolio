import './profile.css';
// import { GoBook } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
// import { LuCookingPot } from "react-icons/lu";
import UploadImg from '../components/UploadImg';
import rootReducer from '../redux/reducers/rootReducer';
import { HiPencil } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";
import { useState } from 'react';
import { UpdateBio } from '../actions/user.actions';
import type { AppDispatch } from '../redux/store';
import { formatDate } from '../hooks/useDates';
import FollowHandle from '../components/Follow.Handle';

const Profile = () => {
    const [bio, setBio] = useState<string | null>(null);
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state: ReturnType<typeof rootReducer>) => state.userReducer)
    const usersData = useSelector((state: ReturnType<typeof rootReducer>) => state.usersReducer)
    const dispatch = useDispatch<AppDispatch>();
    const [followerspop, setfollowerspop]= useState(false);
    const [followingpop, setfollowingpop]= useState(false);


    const handleUpdate = () => {
        if (!bio) return
        dispatch(UpdateBio(userData._id, bio));
        setUpdateForm(false);
    }

    return (
        <>
            <div className="profile-container">

                {/* Part of the banner and profile picture */}
                <div
                    className="banner"
                    style={{
                        backgroundImage: "url(https://cdn.wallpapersafari.com/77/86/LGIxTF.jpg)",
                        backgroundPosition: "center",
                        backgroundSize: "100% auto",
                        boxShadow: "inset 0px 8px 20px 2px #0000009c"
                    }}
                ></div>
                <div className="default-image">
                    <img 
                        src={userData.picture 
                            || 
                        "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"}
                        alt="Profile"
                        className="profile-picture"
                    />
                    <UploadImg />
                </div>

                {/* Profile Information */}
                <div className="profile-info">
                    <div className="profile-info-left">
                        <h3>{userData.pseudo}</h3>
                        
                        <nav className="profile-nav">
                            <div className="user-recipe">
                                <p>{userData.posts ? userData.posts.length : "0"}</p>
                                <h4>Publications</h4>
                            </div>
                            <div className="user-followers" onClick={() => setfollowerspop(true)}>
                                <p>{userData.followers ? userData.followers.length : "0"}</p>
                                <h4>Followers</h4>
                            </div>
                            <div className="user-following" onClick={() => setfollowingpop(true)}>
                                <p>{userData.following ? userData.following.length : "0"}</p>
                                <h4>Following</h4>
                            </div>
                        </nav>
                        {followerspop &&
                            <div className="pop-user-container">
                                <div className="modal">
                                    <h3>follow me</h3>
                                    <span className='cross' onClick={()=> setfollowerspop(false)}>&#10005;</span>
                                    <ul>
                                        {usersData.map((user: any) => {
                                            for (let idx = 0; idx < userData.followers.length; idx++) {
                                                if (user._id === userData.followers[idx]) {
                                                    return (
                                                            <li key={user._id}>
                                                                <img src={user.picture} alt='user-pic' />
                                                                <h4>{user.pseudo}</h4>
                                                                <div className="follow-handler">
                                                                   <FollowHandle idToFollow={user._id} typeTofollow={'suggestion'} /> 
                                                                </div>
                                                            </li>
                                                    );
                                                };
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        }
                        {followingpop &&
                            <div className="pop-user-container">
                                <div className="modal">
                                    <h3>Hello YOU</h3>
                                    <span className='cross' onClick={() => setfollowingpop(false)}>&#10005;</span>
                                    <ul>
                                        {usersData.map((user: any) => {
                                            for (let idx = 0; idx < userData.following.length; idx++) {
                                                if (user._id === userData.following[idx]) {
                                                    return (
                                                            <li key={user._id}>
                                                                <img src={user.picture} alt="user-pic" />
                                                                <h4>{user.pseudo}</h4>
                                                                <div className="follow-handler">
                                                                   <FollowHandle idToFollow={user._id} typeTofollow={'suggestion'} /> 
                                                                </div>
                                                            </li>
                                                    );
                                                }
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>


                    <div className="profile-info-right">
                        <div className="Update-Bio">
                            <h3>BIO</h3>
                            {updateForm === false && (
                                <>
                                    <p>{userData.bio}</p>
                                    <button onClick={() => setUpdateForm(!updateForm)}>
                                        <HiPencil />
                                    </button>
                                </>
                            )}
                            {updateForm && (
                                <div className='Master'>
                                    <textarea
                                    defaultValue={userData.bio}
                                    rows={3}
                                    onChange={(e) => {setBio(e.target.value)}}></textarea>
                                    <button onClick={handleUpdate}>
                                        <FaCheck />
                                    </button>
                                </div>
                            )}
                        </div>
                        <h4>Member since: {formatDate(userData.createdAt)}</h4>
                    </div>
                </div>

                </div>
            {/* <div className="user-post-container">
                <div className="post-content">
                    <LuCookingPot />
                    <p>POST</p>
                </div>
                <div className="recipe-content">
                    <GoBook />
                    <p>RECIPE</p>
                </div>
            </div>
            <div className="display-content">
                <h2>No Posts Yet</h2>
            </div> */}
        </>
    );
}
export default Profile;