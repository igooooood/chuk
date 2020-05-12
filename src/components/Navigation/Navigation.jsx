import React from "react";

import { Link } from "react-router-dom";

import BackIcon from "../../images/BackIcon";
import FavoriteIcon from "../../images/FavoriteIcon";

import "./style.scss";

const Navigation = ({ location }) => {
  const pathname = location().pathname;

  const renderLink = () => {
    if (pathname === "/") {
      return (
        <Link className="nav__element nav__element--favorite" to="/list">
          <FavoriteIcon />
        </Link>
      );
    } else {
      return (
        <Link className="nav__element nav__element--arrow" to="/">
          <BackIcon />
        </Link>
      );
    }
  };

  return <nav className="nav">{renderLink()}</nav>;
};

export default Navigation;
