import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/authOperations";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Імпорт SCSS модуля
import s from "./RegisterForm.module.scss";

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Min 7 characters")
    .required("Password is required"),
});

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, error, isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Registration successful!");
      navigate("/recommended");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <h2>Register</h2>

      <label className={s.label}>
        Name
        <input type="text" {...register("name")} />
        {errors.name && <p className={s.error}>{errors.name.message}</p>}
      </label>

      <label className={s.label}>
        Email
        <input type="email" {...register("email")} />
        {errors.email && <p className={s.error}>{errors.email.message}</p>}
      </label>

      <label className={s.label}>
        Password
        <input type="password" {...register("password")} />
        {errors.password && (
          <p className={s.error}>{errors.password.message}</p>
        )}
      </label>

      <button type="submit" className={s.button} disabled={isLoading}>
        {isLoading ? "Loading..." : "Register"}
      </button>

      <p className={s.text}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </form>
  );
}
