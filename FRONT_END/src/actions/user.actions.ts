import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO"

export const getUser = (uid: string) => {
    return (dispatch: any) => {
        return axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
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
        return  axios.post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
        .then(() => {
            return axios.get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
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
        return axios.put(`${process.env.REACT_APP_API_URL}api/user/` + userId, { bio })
        .then((res) => {
            dispatch({type: UPDATE_BIO, payload: res.data.bio})
        })
        .catch((error) => {
            console.log(error)
        })
    }
};