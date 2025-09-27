import { NavLink } from "react-router-dom";
import css from './Header.module.css'
import logoIcon from '../../assets/images/ichgram.png'
import homeIcon from "../../assets/images/home.svg";
import searchIcon from "../../assets/images/search-ich.svg";
import exploreIcon from "../../assets/images/explore.svg";
import messagesIcon from "../../assets/images/messenger.svg";
import notificationsIcon from "../../assets/images/notifications.svg";
import profileIcon from "../../assets/images/profile.svg";
import createIcon from '../../assets/images/create.svg'



const Header = () => {
    const userId = "1";
  return (
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
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                isActive ? css.activeLink : css.link
              }
            >
              Notifications
            </NavLink>
          </li>
          <li className={css.navItem}>
            <img className={css.icon} src={createIcon} alt="" />
            <NavLink
              to="/create"
              className={({ isActive }) =>
                isActive ? css.activeLink : css.link
              }
            >
              Create
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={css.profileWrapper}>
        <img className={css.icon} src={profileIcon} alt="" />
        <NavLink
          to={`/profile/${userId}`}
          className={({ isActive }) => (isActive ? css.activeLink : css.link)}
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
}

export default Header