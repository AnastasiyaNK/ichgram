export interface User {
  _id: string;
  id?: string;
  name: string;
  email?: string;
  fullName?: string;
  bio?: string;
  profileImage?: string;
  followersCount?: number;
  followingCount?: number;
}



export interface IPost {
  _id: string;
  image: string;
  description?: string;
  author: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  likes: string[];
  createdAt?: string;
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

export interface INotification {
  _id: string;
  type: "like" | "comment" | "follow";
  sender: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  post?: {
    _id: string;
    image?: string;
    description?: string;
  };
  read: boolean;
  createdAt: string;
}