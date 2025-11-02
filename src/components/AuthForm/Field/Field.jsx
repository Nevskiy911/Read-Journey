// import { useRef, useEffect, useState } from "react";
// import s from "./Field.module.scss";
// import sprite from "../../../assets/icons/sprite.svg";

// export default function Field({
//   label,
//   name,
//   type = "text",
//   register,
//   error,
//   isValid,
//   successText,
//   autoComplete,
// }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const labelRef = useRef(null);
//   const inputContainerRef = useRef(null);

//   useEffect(() => {
//     if (labelRef.current && inputContainerRef.current) {
//       const width = labelRef.current.offsetWidth;
//       inputContainerRef.current.style.setProperty(
//         "--label-width",
//         `${width}px`
//       );
//     }
//   }, []);

//   const togglePassword = () => setShowPassword((prev) => !prev);

//   return (
//     <div
//       ref={inputContainerRef}
//       className={`${s.field} ${error ? s.errorField : ""} ${
//         isValid ? s.successField : ""
//       }`}
//     >
//       <span className={s.innerLabel} ref={labelRef}>
//         {label}
//       </span>

//       <input
//         type={type}
//         {...register(name)}
//         name={name}
//         autoComplete={autoComplete || "off"}
//       />

//       {type === "password" && (
//         <svg className={s.togglePassword} onClick={togglePassword}>
//           <use href={`${sprite}#${showPassword ? "eyeoff" : "eye"}`} />
//         </svg>
//       )}

//       {error && (
//         <svg className={`${s.icon} ${s.errorIcon}`}>
//           <use href={`${sprite}#error`} />
//         </svg>
//       )}
//       {isValid && (
//         <svg className={`${s.icon} ${s.successIcon}`}>
//           <use href={`${sprite}#gg`} />
//         </svg>
//       )}

//       {error && <p className={s.error}>{error.message}</p>}
//       {isValid && successText && <p className={s.success}>{successText}</p>}
//     </div>
//   );
// }
import { useRef, useEffect, useState } from "react";
import s from "./Field.module.scss";
import sprite from "../../../assets/icons/sprite.svg";
export default function Field({
  label,
  name,
  type = "text",
  register,
  error,
  isValid,
  successText,
  autoComplete,
  showValidation = false, // новий прапорець
}) {
  const [showPassword, setShowPassword] = useState(false);
  const labelRef = useRef(null);
  const inputContainerRef = useRef(null);

  useEffect(() => {
    if (labelRef.current && inputContainerRef.current) {
      const width = labelRef.current.offsetWidth;
      inputContainerRef.current.style.setProperty(
        "--label-width",
        `${width}px`
      );
    }
  }, []);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const isPasswordField = type === "password";

  return (
    <div
      ref={inputContainerRef}
      className={`${s.field} ${error ? s.errorField : ""} ${
        isValid ? s.successField : ""
      }`}
    >
      <span className={s.innerLabel} ref={labelRef}>
        {label}
      </span>

      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        {...register(name)}
        name={name}
        autoComplete={type === "password" ? "current-password" : "username"}
      />

      {/* Очі для пароля завжди */}
      {type === "password" && (
        <svg
          className={s.togglePassword}
          onClick={() => setShowPassword((p) => !p)}
        >
          <use href={`${sprite}#${showPassword ? "eyeoff" : "eye"}`} />
        </svg>
      )}

      {/* Іконки валідності */}
      {error && (
        <svg className={`${s.icon} ${s.errorIcon}`}>
          <use href={`${sprite}#error`} />
        </svg>
      )}
      {isValid && successText && (
        <svg className={`${s.icon} ${s.successIcon}`}>
          <use href={`${sprite}#gg`} />
        </svg>
      )}

      {/* Текст помилки/успіху */}
      {error && <p className={s.error}>{error.message}</p>}
      {isValid && successText && <p className={s.success}>{successText}</p>}
    </div>
  );
}
