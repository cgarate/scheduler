import React from "react";
import classNames from "classnames";

import "components/Button.scss";

const Button = ({ type, children, disabled, onClick, ...props }) => {
  const buttonClassname = classNames("button", {
    "button--danger": type === "danger",
    "button--confirm": type === "confirm",
  });

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClassname}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
