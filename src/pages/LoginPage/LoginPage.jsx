import AuthImage from "../../components/AuthImage/AuthImage";
import s from "./AuthPage.module.scss";
import LoginForm from "../../components/AuthForm/LoginForm";
import Icon from "../../components/Icon/Icon";

export default function LoginPage() {
  return (
    <div className={s.container}>
      <div className={s.formContainer}>
        <LoginForm />
      </div>
      <AuthImage />
    </div>
  );
}
