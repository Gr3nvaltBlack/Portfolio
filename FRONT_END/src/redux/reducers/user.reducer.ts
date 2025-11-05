import { GET_USER } from "../../actions/user.actions";
import { UPLOAD_PICTURE } from "../../actions/user.actions";


const initialState = {};

type Action = {
    type: string;
    payload?: any
};

export default function userReducer(state = initialState, action: Action) {
    switch (action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state, // To avoid overwriting the user's data
                picture: action.payload
            }
        default:
            return state;
    }
}