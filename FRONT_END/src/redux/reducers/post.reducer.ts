import { ADD_POST, GET_POSTS, LIKE_POST, UNLIKE_POST } from "../../actions/post.action";
import type { Post } from "../../types/Post";

type Action = {
    type: string;
    payload?: any
};


const initialState: Post[] = [];

export default function postReducer(state = initialState, action: Action): Post[] {
    switch(action.type) {
        case GET_POSTS:
            return Array.isArray(action.payload) ? action.payload : state;
        
        case ADD_POST:
            return [action.payload, ...state];

        case LIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: [action.payload.userId, ...post.likers]
                    };
                }
                return post
            });
        
        case UNLIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: post.likers.filter((id) => id !== action.payload.userId)
                    };
                }
                return post
            })
        default:
            return state;
    }
}