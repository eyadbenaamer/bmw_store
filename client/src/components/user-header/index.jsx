import React, { useEffect, useRef } from "react";
import ToggleTheme from "../ToggleTheme";
import Logo from "assets/icons/logo-dark.svg";
import { Link } from "react-router-dom";

const UserHeader = () => {
  const headerOverlay = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight - 50) {
        headerOverlay.current.style.opacity = 1;
      } else {
        headerOverlay.current.style.opacity = 0;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className="fixed top-0 z-40 w-full header ">
      <div ref={headerOverlay} className="header-overlay"></div>
      <div className="container m-auto h-full flex gap-3 items-center justify-between">
        <Link to="/">
          <img src={Logo} alt="BMW" />
        </Link>
        <ToggleTheme />
      </div>
    </header>
  );
};

export default UserHeader;
