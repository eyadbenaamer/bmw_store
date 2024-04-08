import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import { ReactComponent as MoonIcon } from "assets/icons/moon.svg";
const ToggleTheme = () => {
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  return (
    <MoonIcon
      onClick={() => {
        if (mode === "dark") {
          dispatch(setMode("light"));
        } else {
          dispatch(setMode("dark"));
        }
      }}
      style={{
        display: "inline",
        marginRight: 10,
        transform: "translateX(1px)",
      }}
      width={16}
      fill={mode === "dark" ? "#daa520" : "#5b5d67"}
    />
  );
};
export default ToggleTheme;
