import { FOLLOW_USER, GET_USER, UNFOLLOW_USER, UPDATE_BIO, REMOVE_USER } from "../../actions/user.actions";
import { UPLOAD_PICTURE } from "../../actions/user.actions";
import type { User } from "../../types/user";

type Action = {
    type: string;
    payload?: any
};


const initialState: User = {
  _id: "",
  username: "",
  bio: "",
  profilePic: "",
  followers: [],
  following: [],
  createdAt: "",
  updatedAt: ""
};

export default function userReducer(state = initialState, action: Action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                ...action.payload
            };

        case UPLOAD_PICTURE:
            return {
                ...state,
                profilePic: action.payload
            }

        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            }

        case FOLLOW_USER:
            return {
                ...state,
                following: [action.payload.idTofollow, ...state.following]
            }

        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter((id) => id !== action.payload.idToUnfollow)
            }
        
        case REMOVE_USER:
            return {}
            
        default:
            return state;
    }
}