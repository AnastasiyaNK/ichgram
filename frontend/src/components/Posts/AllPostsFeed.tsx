
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTimeAgo } from "../../utils/time";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../redux/postSlice";
import styles from "./AllPostsFeed.module.css";
import avatar from "../../assets/images/border-avatar.svg";
import heart from "../../assets/images/heart-ich.svg";
import redHeartIcon from "../../assets/images/heart_red.png"
import comment from "../../assets/images/comment.svg";
import type { RootState } from "../../redux/store";
import type { IPost } from "../../utils/types";

interface AllPostsFeedProps {
  post: IPost;
  onLike?: (postId: string) => void;
}


const AllPostsFeed: React.FC<AllPostsFeedProps> = ({ post, onLike }) => {
  const navigate = useNavigate();
 

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentUserId = currentUser?._id || currentUser?.id;
  
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const isLikedByCurrentUser = post.likes?.includes(currentUserId || '') || false;
  const likesCount = post.likes?.length || 0;

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    
    if (!currentUserId) {
      console.log('User must be logged in to like posts');
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
      console.error('Error toggling like:', error);
    }
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/profuser/${post.author._id}`);
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/messages");
  };

  return (
    <article className={styles.postCard}>
      <header className={styles.postHeader}>
        <button className={styles.userAvatar} onClick={handleUserClick}>
          <img
            src={post.author.profileImage || avatar}
            alt={`${post.author.name} avatar`}
          />
        </button>
        <div className={styles.userInfo}>
          <p className={styles.username}>{post.author.name}</p>
          <span className={styles.dot}>•</span>
          <p className={styles.postTime}>{getTimeAgo(post.createdAt)}</p>
        </div>
      </header>

      <div className={styles.postImage}>
        <img src={post.image || avatar} alt="post content" />
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
          <span className={styles.captionUsername}>{post.author.name}</span>
          <span className={styles.captionText}>{post.description}</span>
        </div>

        <div className={styles.commentsPreview}>
          <p>View all comments</p>
        </div>
      </footer>
    </article>
  );
};

export default AllPostsFeed;