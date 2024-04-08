import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import Dialog from "components/Dialog";
import Form from "./form";
import { useState } from "react";

const Edit = (props) => {
  const { product } = props;
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <li>
        <button
          className="flex w-full justify-between p-3 bg-hovered text-hovered transition"
          onClick={() => setIsOpened(true)}
        >
          تعديل المنتج
          <span className="w-5 icon">
            <EditIcon />
          </span>
        </button>
      </li>

      <Dialog isOpened={isOpened} setIsOpened={setIsOpened}>
        <Form product={product} setIsOpened={setIsOpened} />
      </Dialog>
    </>
  );
};

export default Edit;
