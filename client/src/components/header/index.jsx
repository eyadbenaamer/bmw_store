import { useSelector } from "react-redux";

import UnloggedIn from "./UnloggedIn";
import LoggedIn from "./logged-in";
import { useLocation } from "react-router-dom";

const Header = () => {
  const isLoggedIn = Boolean(useSelector((state) => state.token));
  const path = useLocation().pathname;
  return (
    <header className="sticky top-0 z-40 w-full shadow-lg bg-200 transition-all">
      {isLoggedIn && path !== "/" && <LoggedIn />}
      {(!isLoggedIn || path === "/") && <UnloggedIn />}
    </header>
  );
};
export default Header;
