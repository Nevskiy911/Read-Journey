import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Container from "../Container/Container";
import s from "./Layout.module.scss";

export default function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"];
  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div className={s.wrapper}>
      {!hideHeader && <Header />}
      <main className={s.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}
