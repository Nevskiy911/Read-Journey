import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authOperations";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import s from "./LoginForm.module.scss";

const schema = Yup.object({
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Min 7 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, error, isLoading } = useSelector((state) => state.auth);

  // Локальний стан для одного показу toast
  const [toastShown, setToastShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  // Успішний логін
  useEffect(() => {
    if (isLoggedIn && !toastShown) {
      toast.success("Welcome back!");
      setToastShown(true); // щоб toast спрацював лише один раз
      navigate("/recommended");
    }
  }, [isLoggedIn, navigate, toastShown]);

  // Обробка помилки
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <h2>Log In</h2>

      <label>
        Email
        <input type="email" {...register("email")} autoComplete="email" />
        {errors.email && <p className={s.error}>{errors.email.message}</p>}
      </label>

      <label>
        Password
        <input
          type="password"
          {...register("password")}
          autoComplete="current-password"
        />
        {errors.password && (
          <p className={s.error}>{errors.password.message}</p>
        )}
      </label>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Log In"}
      </button>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
