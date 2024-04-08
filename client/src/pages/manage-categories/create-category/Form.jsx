import { useContext, useState } from "react";
import axiosClient from "utils/AxiosClient";
import { CategoriesContext } from "..";
import { ReactComponent as LoadingIcon } from "assets/icons/loading-circle.svg";

const Form = (props) => {
  const { setIsOpened } = props;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { fetchCategories } = useContext(CategoriesContext);
  return (
    <div className="create flex flex-col gap-4 w-[280px] sm:w-[320px]">
      <h2 className="text-primary text-xl">إنشاء قسم جديد</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="name">اسم القسم</label>
        <input
          name="name"
          type="text"
          autoFocus
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="الإسم الذي يظهر كعنوان للمنتج"
          onChange={(e) => {
            const newName = e.target.value.trim();
            setName(newName);
            if (!newName) {
              setMessage("هذا الحقل مطلوب.");
            } else if (newName.length < 3) {
              setMessage("الإسم قصير جدًا.");
            } else {
              setMessage("");
            }
          }}
        />
        <div className="text-red-600 h-5 text-sm">
          {!isFocused && <>{message}</>}
        </div>
      </div>
      <button
        disabled={name.length < 3}
        className={`w-[70px] bg-primary  ${
          name.length < 3 ? "opacity-75" : ""
        }  py-2 px-4 radius text-white flex justify-center`}
        onClick={() => {
          setIsLoading(true);
          axiosClient
            .post(`category/add`, { name })
            .then(() => {
              setIsOpened(false);
              fetchCategories();
            })
            .catch((error) => {
              setMessage(error.response?.data.message);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
      >
        {isLoading ? <LoadingIcon width={24} height={24} /> : <>إضافة</>}
      </button>
    </div>
  );
};

export default Form;
