// UserProfile.tsx (або ваша сторінка профілю)

import { useParams } from "react-router-dom";
import { useSelector} from "react-redux";
import { useGetUserPostsQuery } from "../../redux/postSlice";
import { useGetProfileQuery } from "../../redux/apiSlice";
import styles from "./UserProfile.module.css";
import type { RootState } from "../../redux/store";

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  // Отримуємо дані користувача
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetProfileQuery(userId || "");
    
 
  const { data: posts = [], isLoading: postsLoading } = useGetUserPostsQuery(
    userId || ""
  );

  if (userLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Loading profile...</div>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>User not found</div>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      {/* Хедер профілю */}
      <header className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          <img
            src={user.profileImage || "/default-avatar.png"}
            alt={user.name}
            className={styles.avatar}
          />
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.usernameSection}>
            <h1 className={styles.username}>{user.name}</h1>
            {currentUser?._id === userId && (
              <button className={styles.editButton}>Edit Profile</button>
            )}
          </div>

          <div className={styles.statsSection}>
            <span className={styles.stat}>
              <strong>{posts.length}</strong> posts
            </span>
            <span className={styles.stat}>
              <strong>{user.followersCount || 0}</strong> followers
            </span>
            <span className={styles.stat}>
              <strong>{user.followingCount || 0}</strong> following
            </span>
          </div>

          <div className={styles.bioSection}>
            <p className={styles.fullName}>{user.fullName}</p>
            <p className={styles.bio}>{user.bio || "No bio yet"}</p>
          </div>
        </div>
      </header>

      {/* Пости користувача */}
      <section className={styles.postsSection}>
        {postsLoading ? (
          <div className={styles.loading}>Loading posts...</div>
        ) : posts.length > 0 ? (
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <div key={post._id} className={styles.postItem}>
                <img src={post.image} alt="Post" />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noPosts}>
            <p>No posts yet</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
