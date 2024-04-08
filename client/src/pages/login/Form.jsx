import { useRef, useState } from "react";
import submit from "./submit";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "state";
import { Link, Navigate } from "react-router-dom";
import { ReactComponent as ShowPasswordIcon } from "assets/icons/show.svg";
import { ReactComponent as HidePasswordIcon } from "assets/icons/hide.svg";
import { ReactComponent as LoadingIcon } from "assets/icons/loading-circle.svg";

const Form = () => {
  const [data, setData] = useState({ userName: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const submitButton = useRef(null);
  const handleEnterSubmit = (e) => {
    if (e.key === "Enter") {
      submitButton.current.click();
    }
  };
  const [disabled, setDisabled] = useState(false);
  const mode = useSelector((state) => state.mode);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [inputError, setInputError] = useState({ userName: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <section className="flex flex-col gap-4 w-fit center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="col-span-1">
            <label htmlFor="userName">اسم المستخدم</label>
            <input
              style={{
                border: "2px solid transparent",
                borderRadius: "8px",
                boxShadow: "0px 1px 3px 0px #00000026",
              }}
              className={`flex ${
                mode === "light" ? "bg-200" : "bg-alt"
              } p-[4px]`}
              type="text"
              name="userName"
              placeholder="userName"
              value={data.userName}
              onChange={(e) => {
                if (e.target.value) {
                  e.target.style.border = "2px solid transparent";
                  setInputError({ ...inputError, userName: "" });
                } else {
                  e.target.style.border = "2px solid red";
                  setInputError({ ...inputError, userName: "Required" });
                }
                setData({ ...data, userName: e.target.value });
              }}
              onKeyDown={handleEnterSubmit}
            />
            <div className="text-[red]">{inputError.userName}</div>
          </div>
          <div className="col-span-1">
            <label htmlFor="password">كلمة المرور</label>
            <div className="relative w-full">
              <input
                style={{
                  border: "2px solid transparent",
                  borderRadius: "8px",
                  boxShadow: "0px 1px 3px 0px #00000026",
                }}
                className={`pe-7 ${
                  mode === "light" ? "bg-200" : "bg-alt"
                } p-[4px]`}
                autoComplete="false"
                type={passwordInputType}
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => {
                  if (e.target.value) {
                    e.target.style.border = "2px solid transparent";
                    setInputError({ ...inputError, password: "" });
                  } else {
                    e.target.style.border = "2px solid red";
                    setInputError({ ...inputError, password: "Required" });
                  }
                  setData({ ...data, password: e.target.value });
                }}
                onKeyDown={handleEnterSubmit}
              />
              <button
                className="absolute w-5 left-[5px] top-[8px]"
                onClick={() =>
                  setPasswordInputType(
                    passwordInputType === "password" ? "text" : "password"
                  )
                }
              >
                {passwordInputType === "password" ? (
                  <ShowPasswordIcon />
                ) : (
                  "text" && <HidePasswordIcon />
                )}
              </button>
            </div>
            <div className="text-[red]">{inputError.password}</div>
          </div>
        </div>
        {message && <div className="text-[red]">{message}</div>}

        <div className="self-center sm:self-start">
          <button
            ref={submitButton}
            className="py-2 px-4 border-solid bg-primary radius text-white disabled:opacity-70"
            disabled={disabled || inputError.userName || inputError.password}
            onClick={() => {
              if (!(disabled || inputError.userName || inputError.password)) {
                setIsLoading(true);
                setDisabled(true);
                submit(data).then((response) => {
                  let { message, token } = response;
                  setMessage(message);
                  setDisabled(false);
                  setIsLoading(false);
                  dispatch(setToken(token));
                });
              }
            }}
          >
            {isLoading ? (
              <LoadingIcon height={24} stroke="white" />
            ) : (
              "تسجيل الدخول"
            )}
          </button>
        </div>
      </section>
    </>
  );
};
export default Form;
