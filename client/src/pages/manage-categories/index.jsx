import CreateCategory from "./create-category";
import { createContext, useEffect, useState } from "react";
import ReloadBar from "components/ReloadBar";
import Category from "./category";
import Header from "components/header";
import axiosClient from "utils/AxiosClient";
export const CategoriesContext = createContext();

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isAlertOpened, setIsAlertOpened] = useState(false);
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
    <CategoriesContext.Provider
      value={{ categories, setCategories, fetchCategories }}
    >
      <Header />
      <section className="flex container flex-col px-2 gap-8 justify-center py-4">
        <ReloadBar
          action={fetchCategories}
          isAlertOpened={isAlertOpened}
          setIsAlertOpened={setIsAlertOpened}
        />
        <h1 className="heading text-center md:text-start">إدارة الأقسام</h1>
        <div className="grid grid-cols-4 gap-4">
          {categories?.map((category) => (
            <div className=" col-span-4 md:col-span-2">
              <Category category={category} />
            </div>
          ))}
        </div>
        <div className="fixed z-50 bottom-8 right-8">
          <CreateCategory />
        </div>
      </section>
    </CategoriesContext.Provider>
  );
};

export default ManageCategories;
