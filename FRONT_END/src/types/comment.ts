export interface Comment {
  _id: string;
  commenterId: string;
  commenterPseudo: string;
  text: string;
  createdAt?: string;
}