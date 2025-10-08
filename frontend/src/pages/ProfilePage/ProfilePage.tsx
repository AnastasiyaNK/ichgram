import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../redux/apiSlice";
import { useGetUserPostsQuery } from "../../redux/postSlice";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowStatusQuery,
} from "../../redux/followApiSlice";
import type { RootState } from "../../redux/store";
import css from "./ProfilePage.module.css";
import createIcon from "../../assets/images/create.svg";
import { Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import PostView from "../../components/Posts/PostView";
import CreatePostModal from "../../components/Modal/CreatePostModal";
import type { IPost } from "../../utils/types";
import { getUserAvatar } from "../../utils/avatarGenerator";



const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const profileId = userId || currentUser?._id;
  const isOwnProfile = currentUser?._id === profileId;


  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetProfileQuery(profileId || "", {
    skip: !profileId,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: posts = [],
    isLoading: postsLoading,
    refetch: refetchPosts,
  } = useGetUserPostsQuery(profileId || "", { skip: !profileId });

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const { data: followStatus } = useGetFollowStatusQuery(profileId || "", {
    skip: !profileId || !currentUser,
  });

  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [isPostViewOpen, setIsPostViewOpen] = useState(false);

  useEffect(() => {
    if (!isOwnProfile && followStatus?.isFollowing !== undefined) {
      setIsFollowing(followStatus.isFollowing);
    }
  }, [followStatus, isOwnProfile]);

  const handleFollowToggle = async () => {
    if (!userId) return;
    try {
      if (isFollowing) {
        await unfollowUser(userId).unwrap();
        setIsFollowing(false);
      } else {
        await followUser(userId).unwrap();
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("Follow/unfollow error:", err);
      message.error("Action failed");
    }
  };

  const handleMessageClick = () => navigate("/messages");

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");
      message.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      message.error("Logout failed");
      navigate("/login");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePostClick = (post: IPost) => {
    setSelectedPost(post);
    setIsPostViewOpen(true);
  };

  const handleClosePostView = () => {
    setSelectedPost(null);
    setIsPostViewOpen(false);
  };

  const handlePostCreated = () => {
    refetchPosts();
    message.success("Post created successfully!");
  };
  const userAvatar = getUserAvatar(user);

  if (userLoading || postsLoading)
    return (
      <div className={css.loadingContainer}>
        <p className={css.loading}>Loading profile...</p>
      </div>
    );

  if (userError || !user)
    return (
      <div className={css.errorContainer}>
        <p className={css.error}>User not found</p>
      </div>
    );

  return (
    <div className={css.profilePage}>
      <header className={css.profileHeader}>
        <div className={css.avatarSection}>
          <img src={userAvatar} alt={user.name} className={css.avatar} />
        </div>

        <div className={css.profileInfo}>
          <div className={css.usernameSection}>
            <h1 className={css.username}>{user.name}</h1>

            {isOwnProfile ? (
              <>
                <button
                  className={css.editButton}
                  onClick={() => navigate("/profile/edit")}
                >
                  Edit Profile
                </button>
                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className={css.actionButtons}>
                <button
                  className={`${css.followButton} ${
                    isFollowing ? css.following : ""
                  }`}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
                <button
                  className={css.messageButton}
                  onClick={handleMessageClick}
                >
                  Message
                </button>
              </div>
            )}
          </div>

          <div className={css.statsSection}>
            <span className={css.stat}>
              <strong>{posts.length}</strong> posts
            </span>
            <span className={css.stat}>
              <strong>{user.followersCount || 0}</strong> followers
            </span>
            <span className={css.stat}>
              <strong>{user.followingCount || 0}</strong> following
            </span>
          </div>

          <div className={css.bioSection}>
            <p className={css.fullName}>{user.fullName}</p>
            <p className={css.bio}>{user.bio || "No bio yet"}</p>
          </div>
        </div>
      </header>

      <section className={css.postsSection}>
        {posts.length > 0 ? (
          <div className={css.postsGrid}>
            {posts.map((post) => (
              <div
                key={post._id}
                className={css.postItem}
                onClick={() => handlePostClick(post)}
              >
                <img src={post.image} alt="Post" />
              </div>
            ))}
          </div>
        ) : isOwnProfile ? (
          <div className={css.createPostWrapper} onClick={openModal}>
            <img className={css.icon} src={createIcon} alt="Create post" />
            <span className={css.link}>Create new post</span>
          </div>
        ) : (
          <p className={css.noPosts}>No posts yet</p>
        )}
      </section>

      {isPostViewOpen && selectedPost && (
        <PostView
          post={selectedPost}
          currentUser={currentUser}
          onClose={handleClosePostView}
        />
      )}

      {isOwnProfile && (
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
};

export default ProfilePage;













