import { useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "assets/icons/cross.svg";

const Alert = (props) => {
  const { children, type, isOpened, setIsOpened } = props;
  return (
    <>
      {isOpened && (
        <div className={`p-2 radius alert ${type}`}>
          <button
            className="w-3 -translate-x-1 block"
            onClick={() => setIsOpened(false)}
          >
            <CloseIcon stroke="white" />
          </button>
          {children}
        </div>
      )}
    </>
  );
};

export default Alert;
