import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import logoIcon from "../../assets/images/ichgram.png";
import homeIcon from "../../assets/images/home.svg";
import searchIcon from "../../assets/images/search-ich.svg";
import exploreIcon from "../../assets/images/explore.svg";
import messagesIcon from "../../assets/images/messenger.svg";
import notificationsIcon from "../../assets/images/notifications.svg";
import createIcon from "../../assets/images/create.svg";

import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useState } from "react";
import CreatePostModal from "../Modal/CreatePostModal";
import NotificationPanel from "../NotificationPanel/NotificationPanel";
import { getUserAvatar } from "../../utils/avatarGenerator";

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);


  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);
  const closeNotifications = () => setIsNotificationsOpen(false);

    const toggleNotifications = () => {
      setIsNotificationsOpen((prev) => !prev);
    };
  
  const userAvatar = getUserAvatar(user);

  return (
    <>
      <div className={css.header}>
        <div className={css.logoWrapp}>
          <NavLink to="/home">
            <img className={css.logo} src={logoIcon} alt="logo" />
          </NavLink>
        </div>

        <nav className={css.nav}>
          <ul className={css.listNav}>
            <li className={css.navItem}>
              <img className={css.icon} src={homeIcon} alt="" />
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? css.activeLink : css.link
                }
              >
                Home
              </NavLink>
            </li>

            <li className={css.navItem}>
              <img className={css.icon} src={searchIcon} alt="" />
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive ? css.activeLink : css.link
                }
              >
                Search
              </NavLink>
            </li>

            <li className={css.navItem}>
              <img className={css.icon} src={exploreIcon} alt="" />
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  isActive ? css.activeLink : css.link
                }
              >
                Explore
              </NavLink>
            </li>

            <li className={css.navItem}>
              <img className={css.icon} src={messagesIcon} alt="messages" />
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  isActive ? css.activeLink : css.link
                }
              >
                Messages
              </NavLink>
            </li>

            <li className={css.navItem}>
              <img className={css.icon} src={notificationsIcon} alt="" />
              <button
                onClick={toggleNotifications}
                className={css.notificationButton}
              >
                Notifications
              </button>
            </li>

            <li className={css.navItem}>
              <img className={css.icon} src={createIcon} alt="" />
              <NavLink
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  openCreateModal();
                }}
                className={css.link}
              >
                Create
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={css.profileWrapper}>
          <img className={css.avatar} src={userAvatar} alt="avatar" />
          <NavLink
            to={user ? `/profile/${user._id}` : "/login"}
            className={({ isActive }) => (isActive ? css.activeLink : css.link)}
          >
            Profile
          </NavLink>
        </div>
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onPostCreated={() => console.log("Post created from header!")}
      />
      <NotificationPanel
        isOpen={isNotificationsOpen}
        onClose={closeNotifications}
      />
    </>
  );
};

export default Header;
