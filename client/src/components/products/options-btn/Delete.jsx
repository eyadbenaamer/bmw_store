import Dialog from "components/Dialog";
import RedBtn from "components/RedBtn";
import { useContext, useState } from "react";
import { ReactComponent as TrashIcon } from "assets/icons/trash-basket.svg";
import PrimaryBtn from "components/PrimaryBtn";
import axiosClient from "utils/AxiosClient";
import { ProductsContext } from "..";

const Delete = (props) => {
  const { id } = props;
  const { products, fetchProducts, fetchCategories, setSearchParams } =
    useContext(ProductsContext);
  const deleteProduct = () => {
    setIsOpen(false);
    axiosClient
      .delete(`products/delete/${id}`)
      .then(() => {
        if (products?.length > 1) {
          fetchProducts();
        } else if (products?.length === 1) {
          setSearchParams(
            (prev) => {
              prev.set("category", "الكل");
              prev.set("page", 1);
              return prev;
            },
            {
              replace: true,
            }
          );
        }
        fetchCategories();
      })
      .catch(() => {});
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li>
      <button
        className="flex justify-between p-3 bg-hovered w-full text-hovered transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        حذف المنتج
        <span className="w-6 icon">
          <TrashIcon />
        </span>
      </button>
      <Dialog isOpened={isOpen} setIsOpened={setIsOpen}>
        <div className="w-fit">
          <div className=" py-4 ">هل أنت متأكد من حذف هذا المنتج؟</div>
          <div className="flex justify-between mt-2">
            <PrimaryBtn onClick={() => setIsOpen(false)}>إلغاء</PrimaryBtn>
            <RedBtn onClick={deleteProduct}>حذف</RedBtn>
          </div>
        </div>
      </Dialog>
    </li>
  );
};

export default Delete;
