import React from "react";
import sprite from "../../assets/icons/sprite.svg";

const Icon = ({
  name,
  width = 24,
  height = 24,
  color = "currentColor",
  className,
  strokeWidth,
  ...props
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    stroke={color}
    fill="none"
    strokeWidth={strokeWidth || 1}
    aria-hidden="true"
    {...props}
  >
    <use href={`${sprite}#${name}`} />
  </svg>
);

export default Icon;
