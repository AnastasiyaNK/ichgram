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
import { getUserAvatar } from "../../utils/avatarGenerator";
import PostView from "./PostView";

interface AllPostsFeedProps {
  post: IPost;
}

const AllPostsFeed: React.FC<AllPostsFeedProps> = ({ post }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentUserId = currentUser?._id || currentUser?.id;

  // 🔹 локальний стан поста для швидкого оновлення
  const [localPost, setLocalPost] = useState(post);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPostViewOpen, setIsPostViewOpen] = useState(false);

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const isLikedByCurrentUser = localPost.likes.includes(currentUserId || "");
  const likesCount = localPost.likes.length;

  const author = localPost.author || {
    _id: "unknown",
    name: "Unknown User",
    profileImage: null,
  };
  const authorProfileImage = getUserAvatar(author);

  const handleToggleText = () => setIsExpanded((prev) => !prev);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUserId) return;

    // 🔹 Оптимістичне оновлення (без очікування відповіді від сервера)
    const updatedLikes = isLikedByCurrentUser
      ? localPost.likes.filter((id) => id !== currentUserId)
      : [...localPost.likes, currentUserId];

    setLocalPost({ ...localPost, likes: updatedLikes });

    try {
      if (isLikedByCurrentUser) {
        await unlikePost(localPost._id).unwrap();
      } else {
        await likePost(localPost._id).unwrap();
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      setLocalPost(post);
    }
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/profile/${author._id}`);
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/messages");
  };

  const handlePostClick = () => setIsPostViewOpen(true);
  const handleClosePostView = () => setIsPostViewOpen(false);

  return (
    <>
      <article className={styles.postCard} onClick={handlePostClick}>
        <header className={styles.postHeader} onClick={handleUserClick}>
          <img
            className={styles.userAvatar}
            src={authorProfileImage || placeholderAvatar}
            alt={author.name}
          />
          <div className={styles.userInfo}>
            <p className={styles.username}>{author.name}</p>
            <span className={styles.dot}>•</span>
            <p className={styles.postTime}>{getTimeAgo(localPost.createdAt)}</p>
          </div>
        </header>

        <div className={styles.postImage}>
          <img src={localPost.image || placeholderAvatar} alt="post content" />
        </div>

        <footer className={styles.postFooter}>
          <div className={styles.postActions}>
            <button className={styles.likeButton} onClick={handleLikeToggle}>
              <img
                src={isLikedByCurrentUser ? redHeartIcon : heart}
                alt="like"
              />
            </button>
            <button
              className={styles.messageButton}
              onClick={handleMessageClick}
            >
              <img src={comment} alt="message" />
            </button>
          </div>

          <div className={styles.likesCount}>
            <p>{likesCount} likes</p>
          </div>

          {localPost.description && (
            <div className={styles.postCaption}>
              <span className={styles.captionUsername}>{author.name}</span>
              <span
                className={`${styles.captionText} ${
                  isExpanded ? styles.expanded : ""
                }`}
              >
                {localPost.description}
              </span>
              {localPost.description.length > 60 && (
                <button
                  className={styles.moreButton}
                  onClick={handleToggleText}
                >
                  {isExpanded ? " less" : " more"}
                </button>
              )}
            </div>
          )}
        </footer>
      </article>

      {isPostViewOpen && (
        <PostView
          post={localPost}
          currentUser={currentUser}
          onClose={handleClosePostView}
        />
      )}
    </>
  );
};

export default AllPostsFeed;

