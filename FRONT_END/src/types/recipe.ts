import type { Comment } from "./comment";
import type { User } from "./user";

export interface Recipe {
  _id: string;
  creatorId: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  picture?: string;
  likers: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt?: string;
  creator?: User;
}