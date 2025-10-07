// components/posts/PostGrid/PostGrid.jsx
import css from "./PostGrid.module.css";

const PostGrid = ({
  posts,
  onPostClick,
  placeholderAvatar,
  createIcon,
  onCreatePost,
  isOwnProfile,
  isLoading = false,
}) => {
  const hasPosts = posts && posts.length > 0;

  if (isLoading) {
    return <div className={css.loading}>Loading posts...</div>;
  }

  return (
    <div className={css.postsGrid}>
      {hasPosts ? (
        posts.map((post) => (
          <div
            key={post._id}
            className={css.postItem}
            onClick={() => onPostClick(post)}
          >
            <img
              src={post.image}
              alt={post.description || "Post"}
              className={css.postImage}
            />
            {/* Overlay for hover effect */}
            <div className={css.postOverlay}>
              <div className={css.postStats}>
                <span>❤️ {post.likes?.length || 0}</span>
                <span>💬 {post.comments?.length || 0}</span>
              </div>
            </div>
          </div>
        ))
      ) : isOwnProfile ? (
        <div className={css.createPostWrapper} onClick={onCreatePost}>
          <img className={css.icon} src={createIcon} alt="Create post" />
          <span className={css.link}>Create new post</span>
        </div>
      ) : (
        <p className={css.noPosts}>No posts yet.</p>
      )}
    </div>
  );
};

export default PostGrid;
