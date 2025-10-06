import { Link } from 'react-router-dom';
import css from './Footer.module.css'

const Footer = () => {
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
        <Link className={css.navLink} to="/notifications">
          Notifications
        </Link>
        <Link className={css.navLink} to="/create">
          Create
        </Link>
      </div>
      <div>
        <p className={css.ant}>© 2024 ICHgram</p>
      </div>
    </div>
  );
}

export default Footer