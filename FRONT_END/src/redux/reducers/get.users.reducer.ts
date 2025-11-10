import { GET_USERS } from "../../actions/get.users.actions";
import type { User } from "../../types/user";


type Action = {
    type: string;
    payload?: any
};

const initialState: User[] = [];

export default function usersReducer(state = initialState, action: Action) {
    switch(action.payload) {
        case GET_USERS:
            return action.payload;
        default:
            return state;
    }
}