import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
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
import SearchModal from "../Modal/SearchModal";

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);


  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);
  const closeNotifications = () => setIsNotificationsOpen(false);

    const toggleNotifications = () => {
      setIsNotificationsOpen((prev) => !prev);
    };
  
  const userAvatar = getUserAvatar(user);

  return (
    <>
      <div className={style .header}>
        <div className={style .logoWrapp}>
          <NavLink to="/home">
            <img className={style .logo} src={logoIcon} alt="logo" />
          </NavLink>
        </div>

        <nav className={style .nav}>
          <ul className={style .listNav}>
            <li className={style .navItem}>
              <img className={style .icon} src={homeIcon} alt="" />
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? style .activeLink : style .link
                }
              >
                Home
              </NavLink>
            </li>

            <li className={style .navItem}>
              <img className={style .icon} src={searchIcon} alt="" />
              <button
                onClick={() => setIsSearchOpen(true)}
                className={style .notificationButton}
              >
                Search
              </button>
            </li>

            <li className={style .navItem}>
              <img className={style .icon} src={exploreIcon} alt="" />
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  isActive ? style .activeLink : style .link
                }
              >
                Explore
              </NavLink>
            </li>

            <li className={style .navItem}>
              <img className={style .icon} src={messagesIcon} alt="messages" />
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  isActive ? style .activeLink : style .link
                }
              >
                Messages
              </NavLink>
            </li>

            <li className={style .navItem}>
              <img className={style .icon} src={notificationsIcon} alt="" />
              <button
                onClick={toggleNotifications}
                className={style .notificationButton}
              >
                Notifications
              </button>
            </li>

            <li className={style .navItem}>
              <img className={style .icon} src={createIcon} alt="" />
              <NavLink
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  openCreateModal();
                }}
                className={style .link}
              >
                Create
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={style .profileWrapper}>
          <img className={style .avatar} src={userAvatar} alt="avatar" />
          <NavLink
            to={user ? `/profile/${user._id}` : "/login"}
            className={({ isActive }) => (isActive ? style .activeLink : style .link)}
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
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Header;
