import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import Dialog from "components/Dialog";
import { useState } from "react";
import Form from "./Form";

const Edit = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <li>
        <button
          className="flex w-full  justify-between p-3 bg-hovered text-hovered transition"
          onClick={() => setIsOpened(true)}
        >
          تعديل الإسم
          <span className="w-5 icon">
            <EditIcon />
          </span>
        </button>
      </li>

      <Dialog isOpened={isOpened} setIsOpened={setIsOpened}>
        <Form setIsOpened={setIsOpened} />
      </Dialog>
    </>
  );
};

export default Edit;
