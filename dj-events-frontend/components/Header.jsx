import Link from "next/link";
import styles from "../styles/Header.module.css";
import Search from "./Search";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "../context/authContext";
import { useContext } from "react";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {user && (
            <li>
              <Link href="/events/add">
                <a>Add Event</a>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="/account/dashboard">
                <a>Dashboard</a>
              </Link>
            </li>
          )}
          {!user ? (
            <li>
              <Link href="/account/login">
                <a className="btn-secondary btn-icon">
                  <FaSignInAlt />
                  Log in
                </a>
              </Link>
            </li>
          ) : (
            <li>
              <button className="btn-icon btn-secondary" onClick={logout}>
                <FaSignOutAlt /> Sign Out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
