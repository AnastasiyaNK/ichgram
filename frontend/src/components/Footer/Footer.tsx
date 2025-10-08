import { Link } from 'react-router-dom';
import css from './Footer.module.css'
import { useState } from 'react';
import NotificationPanel from '../NotificationPanel/NotificationPanel';

const Footer = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const closeNotifications = () => setIsNotificationsOpen(false);
   const toggleNotifications = () => {
     setIsNotificationsOpen((prev) => !prev);
   };
  return (
    <div className={css.footer}>
      <div className={css.navList}>
        <Link className={css.navLink} to="/home">
          Home
        </Link>
        <Link className={css.navLink} to="/search">
          Search
        </Link>
        <Link className={css.navLink} to="/explore">
          Explore
        </Link>
        <Link className={css.navLink} to="/messages">
          {" "}
          Messages
        </Link>
        
          <button
            onClick={toggleNotifications}
            className={css.notificationButton}
          >
            Notifications
          </button>
       
        <Link className={css.navLink} to="/create">
          Create
        </Link>
      </div>
      <div>
        <p className={css.ant}>© 2024 ICHgram</p>
      </div>

      <NotificationPanel
              isOpen={isNotificationsOpen}
              onClose={closeNotifications}
            />
    </div>
  );
}

export default Footer