export interface User {
  id?: string; 
  _id?: string;
  name: string;
  email: string;
  fullName: string;
  bio?: string;
  profileImage?: string;
  followersCount: number;
  followingCount: number;
}

export interface IPost {
  _id: string;
  author: User;
  description: string;
  image: string;
  likes: string[];
  comments: IComment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IComment {
  _id: string;
  post: string;
  user: User;
  author: User;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}