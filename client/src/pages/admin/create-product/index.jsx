import Dialog from "components/Dialog";
import { useState } from "react";
import Form from "./form";
import { ReactComponent as AddIcon } from "assets/icons/add.svg";

const CreateProduct = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <button
        aria-label="add new product"
        className="bg-[var(--primary-color)] h-[50px] w-[50px] radius "
        onClick={() => setIsOpened(!isOpened)}
      >
        <AddIcon stroke="white" />
      </button>
      <Dialog isOpened={isOpened} setIsOpened={setIsOpened}>
        <Form setIsOpened={setIsOpened} />
      </Dialog>
    </>
  );
};

export default CreateProduct;
