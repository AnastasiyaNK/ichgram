import mongoose, { Types } from "mongoose";

export interface ILike extends mongoose.Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  post: Types.ObjectId;
}

const likeSchema = new mongoose.Schema<ILike>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

likeSchema.index({ user: 1, post: 1 }, { unique: true });

const Like = mongoose.model<ILike>("Like", likeSchema);
export default Like;
