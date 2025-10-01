
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../redux/apiSlice";
import { useGetUserPostsQuery } from "../../redux/postSlice";
import type { RootState } from "../../redux/store";
import css from "./ProfilePage.module.css";
import placeholderAvatar from '../../assets/images/profile.svg'



const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [isEditOpen, setIsEditOpen] = useState(false);
  
    const handleEditClick = () => setIsEditOpen(true);
    const handleClose = () => setIsEditOpen(false);

  const profileId = id ?? currentUser?.id ?? currentUser?._id;
  
  const { data: user, isLoading, error } = useGetProfileQuery(profileId!);
  const { data: userPosts, isLoading: postsLoading } = useGetUserPostsQuery(
    profileId!
  );

  if (isLoading || postsLoading) return <p>Loading profile...</p>;
  if (error || !user) return <p>Profile not found.</p>;

  
const isOwnProfile = currentUser?.id === id;



  return (
    <section className={css.profile}>
      <div className={css.container}>
        <div>
          <img
            className={css.avatarWrapper}
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

            {isEditOpen && (
              <div className={css.modalBackdrop}>
                <div className={css.modal}>
                  <h2>Edit profile</h2>
                  <form>
                    <input type="text" placeholder="Full name" />
                    <input type="text" placeholder="Username" />
                    <textarea placeholder="Bio" />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleClose}>
                      Cancel
                    </button>
                  </form>
                </div>
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

      {/* Пости користувача */}
      <div className={css.postsGrid}>
        {userPosts && userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post._id} className={css.postItem}>
              <img
                src={post.image || placeholderAvatar}
                alt={post.description || "Post"}
              />
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>

      {isOwnProfile && (
        <div className={css.createPostWrapper}>
          <button>Create new post</button>
        </div>
      )}
    </section>
  );
};

export default ProfilePage;








