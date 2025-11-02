import RegisterForm from "../../components/AuthForm/RegisterForm";
import AuthImage from "../../components/AuthImage/AuthImage";
import s from "./AuthPage.module.scss";

export default function RegisterPage() {
  return (
    <div className={s.container}>
      <div className={s.formContainer}>
        <RegisterForm />
      </div>
      <AuthImage />
    </div>
  );
}
