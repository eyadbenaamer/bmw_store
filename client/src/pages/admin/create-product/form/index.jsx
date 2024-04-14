import { useContext, useEffect, useState } from "react";
import { submit } from "./submit";
import DropZone from "components/dropzone";
import ReloadBar from "components/ReloadBar";
import { ProductsContext } from "components/products";
import axiosClient from "utils/AxiosClient";
import { ReactComponent as LoadingIcon } from "assets/icons/loading-circle.svg";

const Form = (props) => {
  const { setIsOpened } = props;
  const { selectedCategory, fetchProducts } = useContext(ProductsContext);
  const [data, setData] = useState({
    name: "",
    category: "",
    description: "",
    stock: "",
    price: "",
    discount: 0,
  });
  const [files, setFiles] = useState([]);
  const [isValidInputs, setIsValidInputs] = useState({
    name: false,
    stock: false,
    price: false,
  });

  const handelChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const disabled = () => {
    for (const key in isValidInputs) {
      if (!isValidInputs[key]) {
        return true;
      }
    }
    return false;
  };
  const [isFocused, setIsFocused] = useState({
    nameInput: true,
    stockInput: true,
    priceInput: true,
  });
  const [categories, setCategories] = useState([]);
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = () => {
    axiosClient
      .get(`category`)
      .then((result) => {
        setCategories(result.data);
        setIsAlertOpened(false);
      })
      .catch(() => {
        setIsAlertOpened(true);
      });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="create grid grid-cols-2 gap-x-4 gap-y-5 m-2 pt-6 container">
      <ReloadBar
        action={fetchCategories}
        isAlertOpened={isAlertOpened}
        setIsAlertOpened={setIsAlertOpened}
      />
      <h1 className="col-span-2">إضافة منتج جديد</h1>
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="name">اسم المنتج</label>
        <input
          name="name"
          type="text"
          autoFocus
          onFocus={() => setIsFocused((prev) => ({ ...prev, nameInput: true }))}
          onBlur={() => setIsFocused((prev) => ({ ...prev, nameInput: false }))}
          placeholder="الإسم الذي يظهر كعنوان للمنتج"
          onChange={(e) => {
            if (e.target.value.length < 3) {
              setIsValidInputs((prev) => ({ ...prev, name: false }));
            } else {
              setIsValidInputs((prev) => ({ ...prev, name: true }));
            }
            handelChange(e);
          }}
        />
        <div className="text-red-600 h-5 text-sm">
          {!isFocused.nameInput && (
            <>
              {!data.name && <> هذا الحقل مطلوب</>}
              {data.name && data.name.length < 3 && <>الإسم قصير جدًا</>}
            </>
          )}
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="description">وصف المنتج</label>
        <textarea
          className="min-h-[200px] overflow-y-scroll"
          value={data.description}
          name="description"
          placeholder="مواصفات ومعلومات عن المنتج"
          onChange={(e) => handelChange(e)}
        />
      </div>
      {categories.length > 0 && (
        <div className="col-span-2">
          <label htmlFor="description">قسم المنتج</label>
          <div className="categories flex justify-start gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category._id ?? 0}
                className={`${
                  data.category === category.name
                    ? "bg-primary"
                    : "bg-alt hover:bg-300"
                } py-2 px-4 radius transition`}
                onClick={() =>
                  setData((prev) => ({ ...prev, category: category.name }))
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="col-span-2 ">
        <label htmlFor="media">صور المنتج</label>
        <div className="mt-[2px]">
          <DropZone files={files} setFiles={setFiles} />
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="stock">العدد في المخزون</label>
        <input
          placeholder="حدد عدد القطع المتوفرة من المنتج"
          name="stock"
          type="text"
          value={data.stock}
          onFocus={() =>
            setIsFocused((prev) => ({ ...prev, stockInput: true }))
          }
          onBlur={() =>
            setIsFocused((prev) => ({ ...prev, stockInput: false }))
          }
          onChange={(e) => {
            let stockArray = e.target.value.match(/[0-9]/g);
            let stock = "";
            stockArray &&
              stockArray.map((digit) =>
                stock.length < 6 ? (stock += digit) : ""
              );
            setData((prev) => ({ ...prev, stock }));
            setIsValidInputs((prev) => ({ ...prev, stock: Boolean(stock) }));
          }}
        />
        <div className="text-red-600 h-5 text-sm">
          {!isFocused.stockInput && !data.stock && <> هذا الحقل مطلوب</>}
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="price">السعر</label>
        <input
          placeholder="حدد سعر المنتج"
          name="price"
          type="text"
          value={data.price}
          onFocus={() =>
            setIsFocused((prev) => ({ ...prev, priceInput: true }))
          }
          onBlur={() =>
            setIsFocused((prev) => ({ ...prev, priceInput: false }))
          }
          onChange={(e) => {
            let priceArray = e.target.value.match(/[0-9]/g);
            let price = "";
            priceArray &&
              priceArray.map((digit) =>
                price.length < 6 ? (price += digit) : ""
              );
            setData((prev) => ({ ...prev, price }));
            setIsValidInputs((prev) => ({ ...prev, price: Boolean(price) }));
          }}
        />
        <div className="text-red-600 h-5 text-sm">
          {!isFocused.priceInput && !data.price && <> هذا الحقل مطلوب</>}
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="discount">نسبة التخفيض</label>
        <input
          type="text"
          name="discount"
          value={data.discount}
          onChange={(e) => {
            let discountArray = e.target.value.match(/[0-9]/g);
            let discount = "";
            discountArray &&
              discountArray.map((digit) =>
                discount.length < 6 ? (discount += digit) : ""
              );
            setData((prev) => ({ ...prev, discount }));
          }}
        />
        <span>%</span>
      </div>
      <button
        disabled={disabled()}
        className={`bg-primary w-fit ${
          disabled() ? "opacity-75" : ""
        } self-center py-2 px-4 radius text-white`}
        onClick={() => {
          setIsLoading(true);
          submit(data, files)
            .then(() => {
              setIsOpened(false);
              if (
                selectedCategory === "الكل" ||
                selectedCategory === data.category
              ) {
                fetchProducts();
              }
            })
            .catch(() => {})
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
