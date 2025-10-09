import React from "react";
import { useGetPostsQuery } from "../../redux/postSlice";
import style from "./HomePage.module.css";
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
      <div className={style.loadingContainer}>
        <div className={style.loading}>Loading posts...</div>
      </div>
    );
  }

  if (postsError) {
    return (
      <div className={style.errorContainer}>
        <div className={style.error}>Error loading posts</div>
        <button onClick={handleRefresh} className={style.retryButton}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={style.allPostsPage}>
      <div className={style.postsGrid}>
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <AllPostsFeed 
              key={post._id} 
              post={post} 
             
            />
          ))
        ) : (
          <div className={style.noPosts}>
            <p>No posts available</p>
            <button onClick={handleRefresh} className={style.refreshButton}>
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
