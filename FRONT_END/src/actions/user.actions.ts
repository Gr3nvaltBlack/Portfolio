import axios from "axios";
import Cookies from "js-cookie"

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO"
export const FOLLOW_USER = "FOLLOW_USER"
export const UNFOLLOW_USER = "UNFOLLOW_USER"
export const REMOVE_USER = "REMOVE_USER"

export const getUser = (uid: string) => {
    return (dispatch: any) => {
        return axios.get(`${import.meta.env.VITE_API_URL}api/user/${uid}`)
        .then((res) => {
            dispatch({ type: GET_USER, payload: res.data })
        })
        .catch((error) => {
            console.log(error)
        })
    };
};

export const uploadPicture = (avatarBase64: string) => {
    return (dispatch: any) => {
        return axios.put(
            `${import.meta.env.VITE_API_URL}api/user/profile/update`,
            { profilePic: avatarBase64 },
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            }
        )
        .then(() => {
            dispatch({ type: UPLOAD_PICTURE, payload: avatarBase64 })
        })
        .catch((error) => {
            console.log(error)
        }) 
    };
};

export const UpdateBio = (bio: string) => {
    return (dispatch: any) => {
        return axios.put(
            `${import.meta.env.VITE_API_URL}api/user/profile/update`,
            { bio },
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            }
        )
        .then((res) => {
            dispatch({type: UPDATE_BIO, payload: bio})
        })
        .catch((error) => {
            console.log(error)
        })
    }
};

export const followUser = (idTofollow: string) => {
    return (dispatch: any) => {
        return axios.patch(
            `${import.meta.env.VITE_API_URL}api/user/follow/` + idTofollow,
            { idTofollow },
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            }
        )
        .then((res) => {
            dispatch({type: FOLLOW_USER, payload: { idTofollow: res.data.idTofollow }})
        })
        .catch((error) => {
            console.log(error)
        })
    }
};

export const unfollowUser = (idToUnfollow: string) => {
    return (dispatch: any) => {
        return axios.patch(
            `${import.meta.env.VITE_API_URL}api/user/unfollow/` + idToUnfollow,
            { idToUnfollow },
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            })
        .then((res) => {
            dispatch({type: UNFOLLOW_USER, payload: { idToUnfollow: res.data.idToUnfollow }})
        })
        .catch((error) => {
            console.log(error)
        })
    }
};

export const logoutUser = () => {
    return (dispatch: any) => {
        dispatch({type: REMOVE_USER, payload: { }})
    }
};