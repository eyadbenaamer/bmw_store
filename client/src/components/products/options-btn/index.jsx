import { useSelector } from "react-redux";
import { ReactComponent as MoreIcon } from "assets/icons/more.svg";
import { useRef, useState } from "react";
import useCloseWidget from "hooks/useCloseWidget";
import Delete from "./Delete";
import Edit from "./edit";

const OptionsBtn = (props) => {
  const { product } = props;

  const mode = useSelector((state) => state.mode);
  const [isOpened, setIsOpened] = useState(false);
  const optionsList = useRef(null);
  useCloseWidget(optionsList, setIsOpened);
  return (
    <div className="relative">
      <button
        aria-label="post options"
        className={`aspect-square w-10 flex justify-center ${
          mode === "dark"
            ? "bg-[#303343] focus:bg-[#303343]"
            : "bg-[#eaedfb] focus:bg-[#eaedfb]"
        } items-center icon transition cursor-pointer `}
        style={{ borderRadius: "50%" }}
        onClick={() => setIsOpened(!isOpened)}
      >
        <MoreIcon style={{ fill: mode === "dark" ? "#c3c5cd" : "#5b5d67 " }} />
      </button>
      {isOpened && (
        <ul
          className={`absolute  top-[105%] right-0 radius w-max overflow-hidden z-100 ${
            mode === "dark" ? "bg-300" : "bg-100"
          }`}
          ref={optionsList}
          // onClick={() => setIsOpen(!isOpen)}
        >
          <Delete id={product._id} />
          <Edit product={product} />
        </ul>
      )}
    </div>
  );
};

export default OptionsBtn;
