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
import Icon from "../Icon/Icon";

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
    watch,
    formState: { errors, isSubmitted, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

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

  const nameValue = watch("name");
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
        label="Name:"
        name="name"
        register={register}
        error={touchedFields.name ? errors.name : null}
        isValid={touchedFields.name && !errors.name && nameValue}
        successText="Name looks good!"
        autoComplete="name"
      />

      <Field
        label="Mail:"
        name="email"
        register={register}
        error={touchedFields.email ? errors.email : null}
        isValid={touchedFields.email && !errors.email && emailValue}
        successText="Email looks good!"
        autoComplete="email"
      />

      <Field
        label="Password:"
        name="password"
        type="password"
        register={register}
        error={errors.password}
        isValid={!errors.password && !!watch("password")}
        successText="Password is secure!"
        showValidation={isSubmitted}
        autoComplete="new-password"
      />

      <div className={s.bottomForm}>
        <button type="submit" className={s.button} disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
        <p className={s.text}>
          <Link to="/login">Already have an account?</Link>
        </p>
      </div>
    </form>
  );
}
