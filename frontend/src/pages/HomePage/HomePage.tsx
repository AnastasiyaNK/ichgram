import React from "react";
import { useGetPostsQuery } from "../../redux/postSlice";
import styles from "./HomePage.module.css";
import AllPostsFeed from "../../components/Posts/AllPostsFeed";

const HomePage: React.FC = () => {
  const {
    data: posts = [],
    isLoading: postsLoading,
    isError: postsError,
    refetch: refetchPosts
  } = useGetPostsQuery();

  const handleLike = (postId: string) => {
    console.log("Liked post:", postId);
  };

  const handleRefresh = () => {
    refetchPosts();
  };

  if (postsLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Loading posts...</div>
      </div>
    );
  }

  if (postsError) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>Error loading posts</div>
        <button onClick={handleRefresh} className={styles.retryButton}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.allPostsPage}>
      <div className={styles.postsGrid}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <AllPostsFeed 
              key={post._id} 
              post={post} 
              onLike={handleLike}
            />
          ))
        ) : (
          <div className={styles.noPosts}>
            <p>No posts available</p>
            <button onClick={handleRefresh} className={styles.refreshButton}>
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

