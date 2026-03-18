export interface User {
  _id: string;
  username: string;
  bio: string;
  followers: string[];
  following: string[];
  createdAt:string;
  updatedAt:string;
  profilePic:string;
}