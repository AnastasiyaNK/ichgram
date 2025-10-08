import mongoose, { Schema, Types } from "mongoose";

export interface INotification extends mongoose.Document {
  recipient: Types.ObjectId; 
  sender: Types.ObjectId; 
  type: "like" | "comment" | "follow";
  post?: Types.ObjectId;
  read: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["like", "comment", "follow"], required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
export default Notification;
