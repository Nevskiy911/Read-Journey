import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/auth/authOperations";
import s from "./UserMenu.module.scss";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const firstLetter = user?.name?.[0]?.toUpperCase() || "?";
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={s.menu}>
      <div className={s.badge}>
        <span className={s.avatar}>{firstLetter}</span>
        <span className={s.username}> {user?.name || "User"}</span>
      </div>
      <button onClick={handleLogout} className={s.logoutBtn}>
        Logout
      </button>
    </div>
  );
}
