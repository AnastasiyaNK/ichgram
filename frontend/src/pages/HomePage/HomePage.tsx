import React from "react";
import { useGetPostsQuery } from "../../redux/postSlice";
import css from "./HomePage.module.css";
import AllPostsFeed from "../../components/Posts/AllPostsFeed";
import type { IPost } from "../../utils/types";

const HomePage: React.FC = () => {
  const {
    data: posts = [],
    isLoading: postsLoading,
    isError: postsError,
    refetch: refetchPosts
  } = useGetPostsQuery();


  const sortedPosts = [...posts].sort((a: IPost, b: IPost) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA; 
  });



  const handleRefresh = () => {
    refetchPosts();
  };

  if (postsLoading) {
    return (
      <div className={css.loadingContainer}>
        <div className={css.loading}>Loading posts...</div>
      </div>
    );
  }

  if (postsError) {
    return (
      <div className={css.errorContainer}>
        <div className={css.error}>Error loading posts</div>
        <button onClick={handleRefresh} className={css.retryButton}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={css.allPostsPage}>
      <div className={css.postsGrid}>
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <AllPostsFeed 
              key={post._id} 
              post={post} 
             
            />
          ))
        ) : (
          <div className={css.noPosts}>
            <p>No posts available</p>
            <button onClick={handleRefresh} className={css.refreshButton}>
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
