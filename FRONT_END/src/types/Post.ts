import type { Comment } from "./comment";
import type { User } from "./user";


export interface Post {
    _id: string;
  posterId: string;
  message: string;
  picture: string;
  video: string;
  likers: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  poster?: User;
}