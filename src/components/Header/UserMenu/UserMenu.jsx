import s from "./UserMenu.module.scss";

export default function UserMenu({ user, onLogout }) {
  return (
    <div className={s.menu}>
      <span className={s.username}>👋 {user?.name || "User"}</span>
      <button onClick={onLogout} className={s.logoutBtn}>
        Logout
      </button>
    </div>
  );
}
