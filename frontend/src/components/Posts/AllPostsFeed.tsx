import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTimeAgo } from "../../utils/time";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../redux/postSlice";
import styles from "./AllPostsFeed.module.css";
import placeholderAvatar from "../../assets/images/border-avatar.svg";
import heart from "../../assets/images/heart-ich.svg";
import redHeartIcon from "../../assets/images/heart_red.png";
import comment from "../../assets/images/comment.svg";
import type { RootState } from "../../redux/store";
import type { IPost } from "../../utils/types";

interface AllPostsFeedProps {
  post: IPost;
  onLike?: (postId: string) => void;
}

const AllPostsFeed: React.FC<AllPostsFeedProps> = ({ post, onLike }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentUserId = currentUser?._id || currentUser?.id;

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const isLikedByCurrentUser =
    post.likes?.includes(currentUserId || "") || false;
  const likesCount = post.likes?.length || 0;


  const author = post.author || {
    _id: "unknown",
    name: "Unknown User",
    profileImage: null,
  };
  const authorName = author.name || "Unknown User";
  // const authorId = author._id || "unknown";
  const authorProfileImage = author.profileImage || placeholderAvatar;

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!currentUserId) {
      console.log("User must be logged in to like posts");
      return;
    }

    try {
      if (isLikedByCurrentUser) {
        await unlikePost(post._id).unwrap();
      } else {
        await likePost(post._id).unwrap();
      }
      if (onLike) {
        onLike(post._id);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };


  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!author._id) return;
    navigate(`/profile/${author._id}`);
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/messages");
  };

  return (
    <article className={styles.postCard}>
      <header className={styles.postHeader} onClick={handleUserClick}>
        <img
          className={styles.userAvatar}
          src={authorProfileImage}
          alt={`${authorName} avatar`}
        />
        <div className={styles.userInfo}>
          <p className={styles.username}>{authorName}</p>
          <span className={styles.dot}>•</span>
          <p className={styles.postTime}>{getTimeAgo(post.createdAt)}</p>
        </div>
      </header>

      <div className={styles.postImage}>
        <img src={post.image || placeholderAvatar} alt="post content" />
      </div>

      <footer className={styles.postFooter}>
        <div className={styles.postActions}>
          <button className={styles.likeButton} onClick={handleLikeToggle}>
            <img src={isLikedByCurrentUser ? redHeartIcon : heart} alt="like" />
          </button>
          <button className={styles.messageButton} onClick={handleMessageClick}>
            <img src={comment} alt="message" />
          </button>
        </div>

        <div className={styles.likesCount}>
          <p>{likesCount} likes</p>
        </div>

        <div className={styles.postCaption}>
          <span className={styles.captionUsername}>{authorName}</span>
          <span
            className={`${styles.captionText} ${
              isExpanded ? styles.expanded : ""
            }`}
          >
            {post.description}
          </span>
          {post.description && post.description.length > 60 && (
            <button className={styles.moreButton} onClick={handleToggleText}>
              {isExpanded ? " less" : " more"}
            </button>
          )}
        </div>

        <div className={styles.commentsPreview}>
          <p>View all comments</p>
        </div>
      </footer>
    </article>
  );
};

export default AllPostsFeed;
