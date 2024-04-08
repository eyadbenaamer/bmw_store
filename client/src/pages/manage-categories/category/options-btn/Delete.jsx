import Dialog from "components/Dialog";
import RedBtn from "components/RedBtn";
import { useContext, useState } from "react";
import { ReactComponent as TrashIcon } from "assets/icons/trash-basket.svg";
import PrimaryBtn from "components/PrimaryBtn";
import { CategoryContext } from "..";
import axiosClient from "utils/AxiosClient";
import { CategoriesContext } from "pages/manage-categories";

const Delete = () => {
  const category = useContext(CategoryContext);
  const { setCategories } = useContext(CategoriesContext);
  const deletePost = () => {
    setIsOpen(false);
    axiosClient
      .delete(`category/delete/${category._id}`)
      .then(() => {
        setCategories((prev) => {
          prev = prev.filter((item) => item._id !== category._id);
          return prev;
        });
      })
      .catch((err) => {});
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li>
      <button
        className="flex justify-between p-3 bg-hovered w-full text-hovered transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        حذف
        <span className="w-6 icon">
          <TrashIcon />
        </span>
      </button>
      <Dialog isOpened={isOpen} setIsOpened={setIsOpen}>
        <div className="w-fit">
          <div className=" py-4 ">هل أنت متأكد من حذف هذا القسم؟</div>
          <div className="flex justify-between mt-2">
            <PrimaryBtn onClick={() => setIsOpen(false)}>إلغاء</PrimaryBtn>
            <RedBtn onClick={deletePost}>حذف</RedBtn>
          </div>
        </div>
      </Dialog>
    </li>
  );
};

export default Delete;
