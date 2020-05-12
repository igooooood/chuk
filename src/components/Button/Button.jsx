import React from "react";

import "./style.scss";

const Button = ({ children, className, ...props }) => {
  const getClassName = () => (className ? `${className} button` : "button");

  return (
    <button {...props} className={getClassName()}>
      {children}
    </button>
  );
};

export default Button;
