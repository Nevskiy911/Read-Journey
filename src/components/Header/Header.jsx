import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "./Navigation/Navigation";
import UserMenu from "./UserMenu/UserMenu";
import s from "./Header.module.scss";
import { logoutUser } from "../../redux/auth/authOperations";
import Icon from "../Icon/Icon";

export default function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <header className={s.header}>
      <Link to="/" className={s.logo}>
        <Icon
          name="logo"
          width={42}
          height={17}
          color="white"
          fill="currentColor"
        />
        <span className={s.logoDescription}>Read Journey</span>{" "}
      </Link>

      <div className={s.navWrapper}>
        <Navigation isLoggedIn={isLoggedIn} />
        {isLoggedIn && (
          <div className={s.userMenu}>
            <UserMenu user={user} onLogout={() => dispatch(logoutUser())} />
          </div>
        )}
      </div>
    </header>
  );
}
