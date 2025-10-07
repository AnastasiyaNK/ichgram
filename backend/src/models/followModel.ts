import mongoose, { Document, Schema, Types } from "mongoose";

export interface IFollow extends Document {
  follower: Types.ObjectId; 
  following: Types.ObjectId; 
  createdAt: Date;
}

const followSchema = new Schema<IFollow>(
  {
    follower: { type: Schema.Types.ObjectId, ref: "User", required: true },
    following: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const FollowModel = mongoose.model<IFollow>("Follow", followSchema);
export default FollowModel;
