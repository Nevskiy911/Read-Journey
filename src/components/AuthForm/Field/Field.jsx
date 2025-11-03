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
  showValidation = false,
  trigger,
  autoComplete,
}) {
  const labelRef = useRef(null);
  const inputContainerRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [wasBlurred, setWasBlurred] = useState(false);

  useEffect(() => {
    if (labelRef.current && inputContainerRef.current) {
      const width = labelRef.current.offsetWidth;
      inputContainerRef.current.style.setProperty(
        "--label-width",
        `${width}px`
      );
    }
  }, []);

  const togglePassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword((prev) => !prev);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setWasBlurred(false);
  };

  const handleBlur = async () => {
    setIsFocused(false);
    setWasBlurred(true);
    if (trigger) await trigger(name);
  };

  const shouldShowValidation = showValidation || (wasBlurred && !isFocused);

  return (
    <div
      ref={inputContainerRef}
      className={`${s.field} ${
        shouldShowValidation && error ? s.errorField : ""
      } ${shouldShowValidation && isValid ? s.successField : ""}`}
    >
      <span className={s.innerLabel} ref={labelRef}>
        {label}
      </span>

      <input
        type={type === "password" && showPassword ? "text" : type}
        {...register(name)}
        name={name}
        autoComplete={autoComplete || "off"}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {type === "password" && (isFocused || showPassword) && (
        <svg
          className={s.togglePassword}
          onMouseDown={(e) => {
            e.preventDefault();
            setShowPassword((prev) => !prev);
          }}
        >
          <use href={`${sprite}#${showPassword ? "eyeoff" : "eye"}`} />
        </svg>
      )}

      {shouldShowValidation && error && (
        <svg className={`${s.icon} ${s.errorIcon}`}>
          <use href={`${sprite}#error`} />
        </svg>
      )}
      {shouldShowValidation && !error && isValid && (
        <svg className={`${s.icon} ${s.successIcon}`}>
          <use href={`${sprite}#gg`} />
        </svg>
      )}

      {shouldShowValidation && error && (
        <p className={s.error}>{error.message}</p>
      )}
      {shouldShowValidation && isValid && successText && (
        <p className={s.success}>{successText}</p>
      )}
    </div>
  );
}
