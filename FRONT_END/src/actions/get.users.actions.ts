import axios from "axios";


export const GET_USERS = "GET_USERS";

export const getUsers = () => {
     return (dispatch: any) => {
        return axios.get(`${import.meta.env.VITE_API_URL}api/user/`)
        .then((res) => {
            dispatch({ type: GET_USERS, payload: res.data})
        })
        .catch ((error) => {
            console.log(error)
        })
     };
};