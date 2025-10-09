import React from "react";
import { useGetExplorePostsQuery } from "../../redux/postSlice";
import style from "./ExplorePage.module.css";
import placeholder from "../../assets/images/placeholde-image.jpg";

const ExplorePage: React.FC = () => {
  const { data: posts = [], isLoading, error } = useGetExplorePostsQuery();

  if (isLoading)
    return (
      <div className={style.loading}>
        <p>Loading posts...</p>
      </div>
    );

  if (error)
    return (
      <div className={style.emptyState}>
        <p>Failed to load posts</p>
      </div>
    );

  if (!posts || posts.length === 0)
    return (
      <div className={style.emptyState}>
        <img src={placeholder} alt="No posts" />
        <p>No posts to explore yet</p>
      </div>
    );

  return (
    <div className={style.conteinerExplore}>
      <div className={style.parent}>
        {posts.map((post) => (
          <div key={post._id} className={style.imageWrapper}>
            <img
              src={post?.image || placeholder}
              alt={post?.description || "post"}
              className={style.image}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
