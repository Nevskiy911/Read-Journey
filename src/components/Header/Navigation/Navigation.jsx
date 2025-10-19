import { NavLink } from "react-router-dom";
import s from "./Navigation.module.scss";

export default function Navigation({ isLoggedIn }) {
  return (
    <ul className={s.navList}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? s.active : s.link)}
        >
          Home
        </NavLink>
      </li>

      {isLoggedIn && (
        <li>
          <NavLink
            to="/library"
            className={({ isActive }) => (isActive ? s.active : s.link)}
          >
            My Library
          </NavLink>
        </li>
      )}

      {!isLoggedIn && (
        <>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? s.active : s.link)}
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? s.active : s.link)}
            >
              Login
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}
