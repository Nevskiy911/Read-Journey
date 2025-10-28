import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/Auth/PrivateRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import RecommendedPage from "./pages/RecommendedPage/RecommendedPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import ReadingPage from "./pages/ReadingPage/ReadingPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import { refreshUser } from "./redux/auth/authOperations";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  const { isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <div>Loading...</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/recommended" element={<RecommendedPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/reading" element={<ReadingPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
