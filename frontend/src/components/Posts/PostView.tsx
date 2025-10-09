import { useState, useEffect } from "react";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useDeletePostMutation,
} from "../../redux/postSlice";
import MessageInput from "../../ui/MessageInput";
import placeholderAvatar from "../../assets/images/border-avatar.svg";
import heart from "../../assets/images/heart-ich.svg";
import redHeartIcon from "../../assets/images/heart_red.png";
import commentIcon from "../../assets/images/comment.svg";
import style from "./PostView.module.css";
import type { IComment, IPost, User } from "../../utils/types";
import { getTimeAgo } from "../../utils/time";
import { getUserAvatar } from "../../utils/avatarGenerator"; 
import PostOptionsModal from "../Modal/PostOptionsModal";
import { EllipsisOutlined } from "@ant-design/icons";



interface PostViewProps {
  post: IPost | null;
  currentUser: User | null;
  onClose: () => void;
}

const PostView = ({ post, currentUser, onClose }: PostViewProps) => {
  const [localComments, setLocalComments] = useState<IComment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
 

  const { data: commentsData, isLoading: commentsLoading } =
    useGetCommentsQuery(post?._id || "");
  const [addComment] = useAddCommentMutation();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
   const [deletePost] = useDeletePostMutation();

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

  const handleLikeToggle = async () => {
    if (!post || !currentUser) return;
    try {
      if (isLiked) {
        await unlikePost(post._id).unwrap();
        setLikeCount((prev) => prev - 1);
      } else {
        await likePost(post._id).unwrap();
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  if (!post) return null;
  const { _id: postId, author, image, description, createdAt } = post;
  const authorAvatar = getUserAvatar(author);

  const handleDelete = async () => {
    try {
      await deletePost(postId).unwrap();
      setIsOptionsOpen(false);
      onClose();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };
 
  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={style.content}>
          <div className={style.imageSection}>
            <img
              src={image}
              alt={description || "Post"}
              className={style.postImage}
              onError={(e) => {
                e.currentTarget.src = placeholderAvatar;
              }}
            />
          </div>

          <div className={style.infoSection}>
            <div className={style.authorInfo}>
              <img
                className={style.avatar}
                src={authorAvatar}
                alt={author?.name}
                onError={(e) => {
                  e.currentTarget.src = placeholderAvatar;
                }}
              />
              <span className={style.authorName}>{author?.name}</span>

              {currentUser?._id === author._id && (
                <button
                  className={style.moreButton}
                  onClick={() => setIsOptionsOpen(true)}
                >
                  <EllipsisOutlined />
                </button>
              )}
            </div>

            <div className={style.commentsContainer}>
              {description && (
                <div className={style.postDescription}>
                  <img
                    className={style.commentAvatar}
                    src={authorAvatar}
                    alt={author?.name}
                    onError={(e) => {
                      e.currentTarget.src = placeholderAvatar;
                    }}
                  />
                  <div className={style.commentContent}>
                    <span className={style.commentAuthor}>{author?.name}</span>
                    <p className={style.commentText}>{description}</p>
                    <span className={style.commentTime}>
                      {getTimeAgo(createdAt)}
                    </span>
                  </div>
                </div>
              )}

              <div className={style.commentsList}>
                {commentsLoading ? (
                  <div className={style.loading}>Loading comments...</div>
                ) : localComments.length > 0 ? (
                  localComments.map((comment) => {
                    const commentAuthor = comment.author || comment.user;
                    const commentAvatar = getUserAvatar(commentAuthor);

                    return (
                      <div key={comment._id} className={style.comment}>
                        <img
                          className={style.commentAvatar}
                          src={commentAvatar}
                          alt={commentAuthor?.name}
                          onError={(e) => {
                            e.currentTarget.src = placeholderAvatar;
                          }}
                        />
                        <div className={style.commentContent}>
                          <div className={style.commentHeader}>
                            <span className={style.commentAuthor}>
                              {commentAuthor?.name}
                            </span>
                            <p className={style.commentText}>{comment.text}</p>
                          </div>
                          <span className={style.commentTime}>
                            {getTimeAgo(comment.createdAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className={style.noComments}>No comments yet</div>
                )}
              </div>
            </div>

            <div className={style.actionsSection}>
              <div className={style.postActions}>
                <button className={style.likeButton} onClick={handleLikeToggle}>
                  <img
                    src={isLiked ? redHeartIcon : heart}
                    alt="like"
                    className={style.likeIcon}
                  />
                </button>
                <button className={style.commentButton}>
                  <img
                    src={commentIcon}
                    alt="comment"
                    className={style.commentIcon}
                  />
                </button>
              </div>

              <div className={style.likesCount}>
                <p>{likeCount} likes</p>
              </div>
              <div className={style.postDate}>{getTimeAgo(createdAt)}</div>
            </div>

            <div className={style.inputContainer}>
              <MessageInput onSend={handleSendComment} />
            </div>
          </div>
        </div>
      </div>

      <PostOptionsModal
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        onDelete={handleDelete}
        onEdit={() => {}}
        onGoToPost={() => (window.location.href = `/post/${postId}`)}
        postId={postId}
      />
    </div>
  );
};

export default PostView;

