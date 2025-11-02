import React from "react";
import s from "./AuthImage.module.scss";
import img1x from "../../assets/images/dsc-bg-phone-1x.webp";
import img2x from "../../assets/images/dsc-bg-phone-2x.webp";

export default function AuthImage() {
  return (
    <div className={s.imageContainer} aria-hidden="true">
      <img
        className={s.image}
        src={img1x}
        srcSet={`${img1x} 1x, ${img2x} 2x`}
        alt=""
        decoding="async"
      />
    </div>
  );
}
