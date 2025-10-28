import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authOperations";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Field from "./Field/Field";
import s from "./Form.module.scss";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Login successful!");
      navigate("/recommended");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <h2>Welcome back!</h2>

      <Field label="Mail:" register={register} error={errors.email} />
      <Field
        label="Password:"
        type="password"
        register={register}
        error={errors.password}
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
