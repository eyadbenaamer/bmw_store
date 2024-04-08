import { useSelector } from "react-redux";

import darkLogo from "assets/icons/logo-dark.svg";
import lightLogo from "assets/icons/logo-light.svg";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const LoggedIn = () => {
  const mode = useSelector((state) => state.mode);

  return (
    <div className="container h-full m-auto flex gap-3 items-center justify-between">
      <Link to="/">
        {mode === "light" ? (
          <img src={lightLogo} alt="Socially" />
        ) : (
          <img src={darkLogo} alt="Socially" />
        )}
      </Link>
      <Menu />
    </div>
  );
};

export default LoggedIn;
