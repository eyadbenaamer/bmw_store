import Dialog from "components/Dialog";
import { useState } from "react";
import Form from "./Form";
import { ReactComponent as AddIcon } from "assets/icons/add.svg";
const CreateCategory = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <button
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

export default CreateCategory;
