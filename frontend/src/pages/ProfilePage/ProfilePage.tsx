
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileQuery } from "../../redux/apiSlice";
import { useGetUserPostsQuery } from "../../redux/postSlice";
import type { RootState } from "../../redux/store";
import css from "./ProfilePage.module.css";
import placeholderAvatar from "../../assets/images/profile.svg";
import { Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../redux/authSlice";
import createIcon from "../../assets/images/create.svg";
import CreatePostModal from "../../components/Modal/CreatePostModal";
import PostView from "../../components/Posts/PostView";

// Додаємо типи
interface IPost {
  _id: string;
  image: string;
  description?: string;
  author: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  likes: string[];
  createdAt?: string;
}

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [isPostViewOpen, setIsPostViewOpen] = useState(false);

  const handleEditClick = () => {
    navigate("/profile/edit");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }
      dispatch(logout());

      message.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      message.error("Logout failed");
      dispatch(logout());
      navigate("/login");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Функція для обробки кліку на пост з типом
  const handlePostClick = (post: IPost) => {
    setSelectedPost(post);
    setIsPostViewOpen(true);
  };

  // Функція для закриття перегляду поста
  const handleClosePostView = () => {
    setIsPostViewOpen(false);
    setSelectedPost(null);
  };

  const handlePostCreated = () => {
    refetchPosts();
    message.success("Post created successfully!");
  };

  const profileId = id ?? currentUser?.id ?? currentUser?._id;

  const {
    data: user,
    isLoading,
    error,
    refetch: refetchProfile,
  } = useGetProfileQuery(profileId!);

  const {
    data: userPosts,
    isLoading: postsLoading,
    refetch: refetchPosts,
  } = useGetUserPostsQuery(profileId!);

  React.useEffect(() => {
    refetchProfile();
    refetchPosts();
  }, [id, refetchProfile, refetchPosts]);

  if (isLoading || postsLoading) return <p>Loading profile...</p>;
  if (error || !user) return <p>Profile not found.</p>;

  const isOwnProfile = currentUser?.id === id;
  const hasPosts = userPosts && userPosts.length > 0;

  return (
    <section className={css.profile}>
      <div className={css.container}>
        <div>
          <img
            className={css.mainAvatar}
            src={user.profileImage || placeholderAvatar}
            alt={user.name}
          />
        </div>

        <div className={css.rightContainer}>
          <div className={css.editProfilWrapper}>
            <p className={css.userName}>{user.name}</p>
            {isOwnProfile && (
              <button className={css.editBtn} onClick={handleEditClick}>
                Edit profile
              </button>
            )}

            {isOwnProfile && (
              <div className={css.logoutWrapper}>
                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  className={css.logoutButton}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>

          <div className={css.statsWrapper}>
            <div className={css.statItem}>
              <span className={css.statNumber}>{userPosts?.length || 0}</span>
              <span className={css.statLabel}>posts</span>
            </div>
            <div className={css.statItem}>
              <span className={css.statNumber}>{user.followersCount}</span>
              <span className={css.statLabel}>followers</span>
            </div>
            <div className={css.statItem}>
              <span className={css.statNumber}>{user.followingCount}</span>
              <span className={css.statLabel}>following</span>
            </div>
          </div>

          <div className={css.bioWrapper}>
            <p className={css.bioText}>{user.bio || "No bio available."}</p>
          </div>
        </div>
      </div>

      <div className={css.postsGrid}>
        {hasPosts ? (
          userPosts.map((post: IPost) => (
            <div
              key={post._id}
              className={css.postItem}
              onClick={() => handlePostClick(post)}
            >
              <img
                src={post.image || placeholderAvatar}
                alt={post.description || "Post"}
              />
            </div>
          ))
        ) : isOwnProfile ? (
          <div
            className={css.createPostWrapper}
            onClick={openModal}
            style={{ cursor: "pointer" }}
          >
            <img className={css.icon} src={createIcon} alt="Create post" />
            <span className={css.link}>Create new post</span>
          </div>
        ) : (
          <p>No posts yet.</p>
        )}
      </div>

     
        {isPostViewOpen && selectedPost && (
          <PostView
            post={selectedPost}
            currentUser={currentUser}
            onClose={handleClosePostView}
          />
        )}

        <CreatePostModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onPostCreated={handlePostCreated}
        />
    
    </section>
  );
};

export default ProfilePage;










