export interface User {
  _id: string;
  pseudo: string;
  bio: string;
  picture: string;
  followers: string[];
  following: string[];
  createdAt:string;
  updatedAt:string;
}