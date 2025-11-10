import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO"
export const FOLLOW_USER = "FOLLOW_USER"
export const UNFOLLOW_USER = "UNFOLLOW_USER"

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

export const uploadPicture = (data: FormData, id: string) => {
    return (dispatch: any) => {
        return  axios.post(`${import.meta.env.VITE_API_URL}api/user/upload`, data)
        .then(() => {
            return axios.get(`${import.meta.env.VITE_API_URL}api/user/${id}`)
            .then((res) => {
                dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
            })
        })
        .catch((error) => {
            console.log(error)
        }) 
    };
};

export const UpdateBio = (userId: string, bio: string) => {
    return (dispatch: any) => {
        return axios.put(`${import.meta.env.VITE_API_URL}api/user/` + userId, { bio })
        .then((res) => {
            dispatch({type: UPDATE_BIO, payload: res.data.bio})
        })
        .catch((error) => {
            console.log(error)
        })
    }
};

export const followUser = (followerId: string, idTofollow: string) => {
    return (dispatch: any) => {
        return axios.patch(`${import.meta.env.VITE_API_URL}api/user/follow/` + followerId, { idTofollow })
        .then((res) => {
            dispatch({type: FOLLOW_USER, payload: { idTofollow: res.data.idTofollow }})
        })
        .catch((error) => {
            console.log(error)
        })
    }
};

export const unfollowUser = (followerId: string, idToUnfollow: string) => {
    return (dispatch: any) => {
        return axios.patch(`${import.meta.env.VITE_API_URL}api/user/unfollow/` + followerId, { idToUnfollow })
        .then((res) => {
            dispatch({type: UNFOLLOW_USER, payload: { idToUnfollow: res.data.idToUnfollow }})
        })
        .catch((error) => {
            console.log(error)
        })
    }
};