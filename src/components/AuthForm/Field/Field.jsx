import { useRef, useEffect } from "react";
import s from "./Field.module.scss";

export default function Field({ label, type = "text", register, error }) {
  const labelRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (labelRef.current && inputRef.current) {
      const width = labelRef.current.offsetWidth;
      inputRef.current.style.setProperty("--label-width", `${width}px`);
    }
  }, []);

  return (
    <div className={s.field}>
      <span className={s.innerLabel} ref={labelRef}>
        {label}
      </span>
      <input type={type} {...register(label.toLowerCase())} ref={inputRef} />
      {error && <p className={s.error}>{error.message}</p>}
    </div>
  );
}
