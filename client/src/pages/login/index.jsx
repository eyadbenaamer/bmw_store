import { Link } from "react-router-dom";
import Form from "./Form";
import { useSelector } from "react-redux";
import Header from "components/header";
const Login = () => {
  const mode = useSelector((state) => state.mode);
  return (
    <>
      <Header />
      <div className="container m-auto">
        <div
          className={`auth flex flex-col gap-3 w-fit my-5 mx-auto shadow-md radius p-4 bg-300 ${
            mode === "light" ? "border" : ""
          }`}
        >
          <h2 className="text-2xl">البوابة</h2>
          <Form />
        </div>
      </div>
    </>
  );
};
export default Login;
