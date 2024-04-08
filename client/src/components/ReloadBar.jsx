import React from "react";
import Alert from "./Alert";

const ReloadBar = (props) => {
  const { action, isAlertOpened, setIsAlertOpened } = props;
  return (
    <Alert
      type={"error"}
      isOpened={isAlertOpened}
      setIsOpened={setIsAlertOpened}
    >
      <span>تحقق من إتصال الإنترنت.</span>
      <button
        className="hover:underline inline underline-offset-4"
        onClick={() => {
          setIsAlertOpened(false);
          action();
        }}
      >
        إعادة تحميل
      </button>
    </Alert>
  );
};

export default ReloadBar;
