import Product from "components/Product";
import { motion } from "framer-motion";
import { createContext, useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import OptionsBtn from "./options-btn";
import { useLocation } from "react-router-dom";
import ReloadBar from "components/ReloadBar";

import { ReactComponent as LoadingIcon } from "assets/icons/loading-circle.svg";
import { ReactComponent as NextIcon } from "assets/icons/arrow-prev.svg";
import { ReactComponent as PrevIcon } from "assets/icons/arrow-next.svg";
import axiosClient from "utils/AxiosClient";

export const ProductsContext = createContext();

const Products = (props) => {
  const { children } = props;
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [products, setProducts] = useState(null);
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const isAdminPage = useLocation().pathname.startsWith("/admin");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  // to set categories names once the page is rendered
  useEffect(() => {
    axiosClient.get(`category`).then((result) => {
      setCategories([{ name: "الكل" }].concat(result.data));
      let newCategories = [{ name: "الكل" }];
      result.data.map((category) => {
        if (category.products.length > 0) {
          newCategories.push(category);
        }
      });
      setCategories(newCategories);
    });
  }, []);

  const fetchProducts = () => {
    if (selectedCategory === "الكل") {
      axiosClient
        .get(`products/page/${page}`)
        .then((response) => {
          if (response.status === 200) {
            setProducts(response.data.products || []);
            setPagesCount(response.data.pagesCount);
          }
          setIsAlertOpened(false);
        })
        .catch(() => {
          setProducts(null);
          setIsAlertOpened(true);
        });
    } else {
      axiosClient
        .post(`category/products/`, { name: selectedCategory, page })
        .then((response) => {
          if (response.status === 200) {
            categories.map((item) => {
              if (item.name === selectedCategory) {
                if (item.products.length > 12) {
                  setPagesCount(Math.ceil(item.products.length / 12));
                } else {
                  setPagesCount(0);
                }
              }
            });
            setProducts(response.data);
          }
          setIsAlertOpened(false);
        })
        .catch(() => {
          setProducts(undefined);
          setIsAlertOpened(true);
        });
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page, selectedCategory]);
  const productsRef = useRef();
  return (
    <ProductsContext.Provider
      value={{ selectedCategory, setProducts, fetchProducts }}
    >
      {children}
      <div
        ref={productsRef}
        className="container flex flex-col gap-6 items-center min-h-screen"
      >
        <ReloadBar
          action={fetchProducts}
          isAlertOpened={isAlertOpened}
          setIsAlertOpened={setIsAlertOpened}
        />
        <h1 className="heading self-start">المنتجات</h1>
        <div className="flex justify-start gap-2 flex-wrap">
          {products !== undefined ||
            (products == [] &&
              categories.map((category) => (
                <button
                  key={category._id ?? 0}
                  className={`${
                    selectedCategory === category.name
                      ? "bg-primary text-white"
                      : "bg-alt hover:bg-300"
                  } py-2 px-4 radius transition`}
                  onClick={() => {
                    setProducts(null);
                    setPagesCount(0);
                    setSelectedCategory(category.name);
                    setPage(1);
                  }}
                >
                  {category.name}
                </button>
              )))}
        </div>
        {/* in case there is no products */}
        {products?.length === 0 && (
          <div className="text-start w-full">لا توجد منتجات</div>
        )}
        {/* when loading */}
        {!products && <LoadingIcon className="icon" />}
        {/* when products fetched successfully */}
        {products?.length > 0 && (
          <div className="grid grid-cols-12 gap-6 items-center w-full">
            {products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "linear" }}
                className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 relative"
              >
                <Product data={product} />
                {isAdminPage && (
                  <div className="absolute top-2 right-2 z-200">
                    <OptionsBtn product={product} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {products?.length > 0 && (
        <ReactPaginate
          containerClassName="flex flex-wrap justify-center gap-2"
          pageClassName="page"
          pageLinkClassName="transition bg-200"
          breakClassName=""
          breakLinkClassName="py-4 px-1"
          nextClassName="flex items-center"
          nextLinkClassName=""
          previousClassName="flex items-center"
          previousLinkClassName=""
          activeClassName="active"
          breakLabel="..."
          nextLabel={<NextIcon width={30} className="icon hovered" />}
          previousLabel={<PrevIcon width={30} className="icon hovered" />}
          onPageChange={(page) => {
            setProducts(null);
            setPagesCount(0);
            setPage(page.selected + 1);
            window.scrollTo({
              top: productsRef.current.offsetTop - 70,
            });
          }}
          pageCount={pagesCount}
          pageRangeDisplayed={2}
          renderOnZeroPageCount={null}
        />
      )}
    </ProductsContext.Provider>
  );
};

export default Products;
