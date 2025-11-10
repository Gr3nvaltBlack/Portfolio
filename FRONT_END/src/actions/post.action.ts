import axios from "axios";

// Post action
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST"
export const UNLIKE_POST = "UNLIKE_POST"

// Comment action
export const ADD_COMMENT = "ADD_COMMENT"

export const getPosts = (num: number) => {
    return (dispatch: any) => {
        return axios.get(`${import.meta.env.VITE_API_URL}api/post`)
        .then((res) => {
            const array = res.data.slice(0, num)
            dispatch({type: GET_POSTS, payload: array})
        })
        .catch((error) => {
            console.log(error)
        })
    };
};

export const addPost = (data: FormData) => {
    return (dispatch: any) => {
        return axios.post(`${import.meta.env.VITE_API_URL}api/post/`, data)
        .then((res) => {
            dispatch({type: ADD_POST, payload: res.data})
        })
        .catch((error) => {
            console.log(error)
        })
    };
};


export const likePost = (postId: string, userId: string) => {
    return (dispatch: any) => {
        return axios.patch(`${import.meta.env.VITE_API_URL}api/post/like-post/` + postId, { id: userId })
        .then(() => {
            dispatch({ type: LIKE_POST, payload: {postId, userId} })
        })
        .catch((error) => {
            console.log(error)
        })
    };
};

export const unlikePost = (postId: string, userId: string) => {
    return (dispatch: any) => {
        return axios.patch(`${import.meta.env.VITE_API_URL}api/post/unlike-post/` + postId, { id: userId })
        .then(() => {
            dispatch({ type: UNLIKE_POST, payload: {postId, userId} })
        })
        .catch((error) => {
            console.log(error)
        })
    };
};

export const addComment = (postId: string, commenterId: string, text: string, commenterPseudo: string) => {
    return (dispatch: any) => {
            return axios.post(`${import.meta.env.VITE_API_URL}api/comment/post/${postId}/comments`,
                {
                commenterId,
                text,
                commenterPseudo,
                })
                .then((res) => {
                    dispatch({ type: ADD_COMMENT, payload: res.data })
                })
                .catch((error) => {
                    console.error(error)
                })
    }
};