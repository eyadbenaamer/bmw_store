import { useSelector } from "react-redux";

import ToggleTheme from "../ToggleTheme";

import darkLogo from "assets/icons/logo-dark.svg";
import lightLogo from "assets/icons/logo-light.svg";
import { Link } from "react-router-dom";

const UnloggedIn = () => {
  const mode = useSelector((state) => state.mode);
  return (
    <div className="container m-auto h-full flex gap-3 items-center justify-between">
      <Link to="/">
        {mode === "light" ? (
          <img src={lightLogo} alt="BMW" />
        ) : (
          <img src={darkLogo} alt="BMW" />
        )}
      </Link>
      <ToggleTheme />
    </div>
  );
};

export default UnloggedIn;
