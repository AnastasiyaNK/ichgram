import { useState, useEffect } from "react";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../redux/postSlice";
import MessageInput from "../../ui/MessageInput";
import placeholderAvatar from "../../assets/images/border-avatar.svg";
import css from "./PostView.module.css";
import type { IComment, IPost, User } from "../../utils/types";

interface PostViewProps {
  post: IPost | null;
  currentUser: User | null;
  onClose: () => void;
}

const PostView = ({ post, currentUser, onClose }: PostViewProps) => {
  const [localComments, setLocalComments] = useState<IComment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { data: commentsData, isLoading: commentsLoading } =
    useGetCommentsQuery(post?._id || "");
  const [addComment] = useAddCommentMutation();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  useEffect(() => {
    if (commentsData) setLocalComments(commentsData);
  }, [commentsData]);

  useEffect(() => {
    if (post && currentUser) {
      const userId = currentUser._id || currentUser.id;
      setIsLiked(userId ? post.likes?.includes(userId) : false);
      setLikeCount(post.likes?.length || 0);
    }
  }, [post, currentUser]);

  const handleSendComment = async (text: string) => {
    if (!text.trim() || !post) return;
    try {
      const result = await addComment({ postId: post._id, text }).unwrap();
      setLocalComments((prev) => [...prev, result]);
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const handleLike = async () => {
    if (!post || !currentUser) return;
    try {
      if (isLiked) {
        await unlikePost(post._id).unwrap();
        setLikeCount((p) => p - 1);
      } else {
        await likePost(post._id).unwrap();
        setLikeCount((p) => p + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  if (!post) return null;

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={css.content}>
          <div className={css.imageSection}>
            <img
              src={post.image}
              alt={post.description || "Post"}
              className={css.postImage}
            />
          </div>

          <div className={css.infoSection}>
            <div className={css.authorInfo}>
              <img
                className={css.avatar}
                src={post.author?.profileImage || placeholderAvatar}
                alt={post.author?.name}
              />
              <span className={css.authorName}>{post.author?.name}</span>
            </div>

            <div className={css.commentsContainer}>
              {post.description && (
                <div className={css.postDescription}>
                  <img
                    className={css.commentAvatar}
                    src={post.author?.profileImage || placeholderAvatar}
                    alt={post.author?.name}
                  />
                  <div className={css.commentContent}>
                    <span className={css.commentAuthor}>
                      {post.author?.name}
                    </span>
                    <p className={css.commentText}>{post.description}</p>
                  </div>
                </div>
              )}

              <div className={css.commentsList}>
                {commentsLoading ? (
                  <div className={css.loading}>Loading comments...</div>
                ) : localComments.length > 0 ? (
                  localComments.map((comment) => (
                    <div key={comment._id} className={css.comment}>
                      <img
                        className={css.commentAvatar}
                        src={
                          comment.author?.profileImage ||
                          comment.user?.profileImage ||
                          placeholderAvatar
                        }
                        alt={comment.author?.name || comment.user?.name}
                      />
                      <div className={css.commentContent}>
                        <span className={css.commentAuthor}>
                          {comment.author?.name || comment.user?.name}
                        </span>
                        <p className={css.commentText}>{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={css.noComments}>No comments yet</div>
                )}
              </div>
            </div>

            <div className={css.actionsSection}>
              <div className={css.actions}>
                <button
                  className={`${css.likeButton} ${isLiked ? css.liked : ""}`}
                  onClick={handleLike}
                >
                  {isLiked ? "❤️" : "🤍"}
                </button>
                <span className={css.likeCount}>{likeCount} likes</span>
              </div>
              <div className={css.postDate}>
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : ""}
              </div>
            </div>

            <div className={css.inputContainer}>
              <MessageInput onSend={handleSendComment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;

