// import { Link } from 'react-router-dom';
// import css from './Footer.module.css'
// import { useState } from 'react';
// import NotificationPanel from '../NotificationPanel/NotificationPanel';
// import SearchModal from '../Modal/SearchModal';

// const Footer = () => {
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);


//   const closeNotifications = () => setIsNotificationsOpen(false);
//   const closeSearch = () => setIsSearchOpen(false);


//   const toggleNotifications = () => {
//     setIsNotificationsOpen((prev) => !prev);
//     return (
//       <div className={css.footer}>
//         <div className={css.navList}>
//           <Link className={css.navLink} to="/home">
//             Home
//           </Link>
//           <Link className={css.navLink} to="/search" onClick={() => setIsSearchOpen(true)}>
//             Search
//           </Link>
//           <Link className={css.navLink} to="/explore">
//             Explore
//           </Link>
//           <Link className={css.navLink} to="/messages">
//             {" "}
//             Messages
//           </Link>
//           <Link className={css.navLink} to="/notifications" onClick={toggleNotifications}>
//             Notifications
//           </Link>
//           <Link className={css.navLink} to="/create">
//             Create
//           </Link>
//         </div>
//         <div>
//           <p className={css.ant}>© 2024 ICHgram</p>
//         </div>


//       </div>
//     );
//   }
// }
//   export default Footer;

import { Link } from "react-router-dom";
import css from "./Footer.module.css";
import { useState } from "react";
import CreatePostModal from "../Modal/CreatePostModal";
import NotificationPanel from "../NotificationPanel/NotificationPanel";
import SearchModal from "../Modal/SearchModal";

const Footer = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const closeNotifications = () => setIsNotificationsOpen(false);
  const closeSearch = () => setIsSearchOpen(false);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={css.footer}>
        <div className={css.navList}>
          <Link className={css.navLink} to="/home">
            Home
          </Link>

          {/* Search - відкриває модалку */}
          <button className={css.navLink} onClick={() => setIsSearchOpen(true)}>
            Search
          </button>

          <Link className={css.navLink} to="/explore">
            Explore
          </Link>

          <Link className={css.navLink} to="/messages">
            Messages
          </Link>

          {/* Notifications - відкриває модалку */}
          <button className={css.navLink} onClick={toggleNotifications}>
            Notifications
          </button>

          {/* Create - відкриває модалку */}
          <button
            className={css.navLink}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create
          </button>
        </div>

        <div>
          <p className={css.ant}>© 2024 ICHgram</p>
        </div>
      </div>

      {/* Додаємо модалки в Footer */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onPostCreated={() => console.log("Post created from footer!")}
      />

      <NotificationPanel
        isOpen={isNotificationsOpen}
        onClose={closeNotifications}
      />

      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
};

export default Footer;