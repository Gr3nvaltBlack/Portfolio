import axios from "axios";
import Cookies from "js-cookie"

// Post action
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST"
export const UNLIKE_POST = "UNLIKE_POST"

// Comment action
export const ADD_COMMENT = "ADD_COMMENT"

// Error 
export const GET_POST_ERRORS = "GET_POST_ERRORS"

export const getPosts = (num: number) => {
    return (dispatch: any) => {
        return axios.get(
            `${import.meta.env.VITE_API_URL}api/post`,
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            }
        )
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
        return axios.post(
            `${import.meta.env.VITE_API_URL}api/post/`,
            data,
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((res) => {
            if (res.data.error) {
                dispatch({ type: GET_POST_ERRORS, payload: res.data.error })
            }
            dispatch({type: ADD_POST, payload: res.data})
        })
        .catch((error) => {
            console.log(error)
        })
    };
};


export const likePost = (postId: string) => {
    return (dispatch: any) => {
        return axios.patch(
            `${import.meta.env.VITE_API_URL}api/post/${postId}/like`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            }
        )
        .then((resp) => {
            dispatch({ type: LIKE_POST, payload: {post: resp.data.updatedPost} })
        })
        .catch((error) => {
            console.log(error)
        })
    };
};

export const unlikePost = (postId: string) => {
    return (dispatch: any) => {
        return axios.patch(
            `${import.meta.env.VITE_API_URL}api/post/${postId}/unlike`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            }
        )
        .then((resp) => {
            dispatch({ type: UNLIKE_POST, payload: {post: resp.data.updatedPost} })
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
                },
                {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('jwt')}`
                    }
                }
            )
                .then((res) => {
                    dispatch({ type: ADD_COMMENT, payload: res.data })
                })
                .catch((error) => {
                    console.error(error)
                })
    }
};