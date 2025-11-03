import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authOperations";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import s from "./Form.module.scss";
import Field from "./Field/Field";
import Icon from "../Icon/Icon";

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Minimum 7 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, error, isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => dispatch(loginUser(data));

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Login successful!");
      navigate("/recommended");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <div className={s.logoWrapper}>
        <Icon
          name="logo"
          width={42}
          height={17}
          color="white"
          fill="currentColor"
          className={s.logo}
        />
        <span className={s.logoDescription}>Read Journey</span>
      </div>

      <h2>
        Expand your mind, reading <span className={s.book}>a book</span>
      </h2>

      <Field
        label="Mail:"
        name="email"
        register={register}
        trigger={trigger}
        error={errors.email}
        isValid={!errors.email && !!emailValue}
        successText="Email looks valid!"
        autoComplete="email"
        showValidation={isSubmitted}
      />

      <Field
        label="Password:"
        name="password"
        type="password"
        register={register}
        trigger={trigger}
        error={errors.password}
        isValid={!errors.password && !!passwordValue}
        successText="Password is secure!"
        autoComplete="current-password"
        showValidation={isSubmitted}
      />

      <div className={s.bottomForm}>
        <button type="submit" className={s.button} disabled={isLoading}>
          {isLoading ? "Loading..." : "Log In"}
        </button>
        <p className={s.text}>
          <Link to="/register">Don’t have an account?</Link>
        </p>
      </div>
    </form>
  );
}
