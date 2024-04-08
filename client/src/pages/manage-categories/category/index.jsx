import { createContext } from "react";
import OptionsBtn from "./options-btn";

export const CategoryContext = createContext();
const Category = (props) => {
  const { category } = props;
  return (
    <CategoryContext.Provider value={category}>
      <div
        className={`bg-alt hover:bg-300 py-2 px-4 radius transition relative h-full flex items-center justify-center`}
      >
        {category.name}
        <div className="absolute top-0 left-2 ">
          <OptionsBtn />
        </div>
      </div>
    </CategoryContext.Provider>
  );
};

export default Category;
