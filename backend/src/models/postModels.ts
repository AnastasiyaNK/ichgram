import mongoose, { Types } from "mongoose";

export interface IPost extends mongoose.Document {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  description: string;
  image: string;
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  randomValue: number;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, default: "" },
    image: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    randomValue: { type: Number, default: () => Math.random(), index: true },
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", postSchema);
export default Post;
