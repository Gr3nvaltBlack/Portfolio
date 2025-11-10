import { GET_POST_ERRORS } from "../../actions/post.action";
import type { ErrorState } from "../../types/error";


type Action = {
    type: string;
    payload?: any
};

const initialState: ErrorState = {
    userError: [],
    postError: [],
};

export default function errorReducer(state = initialState, action: Action): ErrorState {
    switch(action.payload) {
        case GET_POST_ERRORS:
            return {
                postError: action.payload,
                userError: [],
            }
        default:
            return state;
    }
}