import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/authOperations";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import s from "./Form.module.scss";
import Field from "./Field/Field";

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

  const onSubmit = (data) => dispatch(registerUser(data));

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
      <h2>
        Expand your mind, reading <span className={s.book}>a book</span>
      </h2>

      <Field label="Name:" register={register} error={errors.name} />
      <Field label="Mail:" register={register} error={errors.email} />
      <Field
        label="Password:"
        type="password"
        register={register}
        error={errors.password}
      />

      <div className={s.bottomForm}>
        <button type="submit" className={s.button} disabled={isLoading}>
          {isLoading ? "Loading..." : "Registration"}
        </button>
        <p className={s.text}>
          <Link to="/login">Already have an account?</Link>
        </p>
      </div>
    </form>
  );
}
