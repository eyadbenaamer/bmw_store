import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DropDownIcon } from "assets/icons/drop-down.svg";
import { ReactComponent as SettingsIcon } from "assets/icons/settings.svg";
import { useRef, useState } from "react";
import ToggleTheme from "components/ToggleTheme";
import { logout, setMode } from "state";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import useCloseWidget from "hooks/useCloseWidget";
import { Link } from "react-router-dom";
const Menu = () => {
  const mode = useSelector((state) => state.mode);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const menu = useRef(null);
  useCloseWidget(menu, setShowMenu);
  return (
    <div
      className="cursor-pointer relative flex justify-center w-10"
      onClick={() => {
        setShowMenu(!showMenu);
      }}
    >
      <DropDownIcon className="icon hovered" />
      {showMenu && (
        <div
          ref={menu}
          className="menu bg-300 cursor-pointer absolute right-[-100px] top-[40px] radius w-max"
        >
          <ul className="flex flex-col radius ">
            <Link to={"/admin/manage-categories"}>
              <li className="flex justify-between py-2 px-3 radius gap-3 bg-hovered text-hovered">
                <span>إدارة الأقسام</span>
                <SettingsIcon className="icon hovered" width={16} />
              </li>
            </Link>
            <li
              onClick={() => {
                mode === "dark"
                  ? dispatch(setMode("light"))
                  : dispatch(setMode("dark"));
              }}
              className="flex justify-between py-2 px-3 radius gap-3 bg-hovered text-hovered"
            >
              <span>الوضع المظلم</span>
              <ToggleTheme />
            </li>
            <li
              className="flex justify-between icon py-2 px-3 radius -3 bg-hovered text-hovered"
              onClick={() => {
                dispatch(logout());
              }}
            >
              <span>تسجيل الخروج</span>
              <LogoutIcon width={16} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
