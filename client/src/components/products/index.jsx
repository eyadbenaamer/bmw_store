import Product from "components/Product";
import { motion } from "framer-motion";
import { createContext, useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import OptionsBtn from "./options-btn";
import { useLocation, useSearchParams } from "react-router-dom";
import ReloadBar from "components/ReloadBar";

import { ReactComponent as LoadingIcon } from "assets/icons/loading-circle.svg";
import { ReactComponent as NextIcon } from "assets/icons/arrow-left.svg";
import { ReactComponent as PrevIcon } from "assets/icons/arrow-right.svg";
import axiosClient from "utils/AxiosClient";

export const ProductsContext = createContext();

const Products = (props) => {
  const { children } = props;

  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    category: "الكل",
  });
  const [pagesCount, setPagesCount] = useState(0);
  const [products, setProducts] = useState(null);
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const isAdminPage = useLocation().pathname.startsWith("/admin");

  const page = searchParams.get("page");
  const selectedCategory = searchParams.get("category");
  // to set categories names once the page is rendered
  useEffect(() => {
    axiosClient
      .get(`category`)
      .then((result) => {
        setCategories([{ name: "الكل" }].concat(result.data));
        let newCategories = [{ name: "الكل" }];
        result.data.map((category) => {
          if (category.products.length > 0) {
            newCategories.push(category);
          }
        });
        setCategories(newCategories);
      })
      .catch(() => setIsAlertOpened(true));
  }, []);
  const fetchProducts = () => {
    setIsLoading(true);
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
        .catch((error) => {
          if (error.response?.status === 404) {
            setMessage(error.response.data.message);
          } else {
            setProducts(null);
            setIsAlertOpened(true);
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      axiosClient
        .post(`category/products/`, {
          name: searchParams.get("category"),
          page: page,
        })
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
        .catch((error) => {
          if (error.response?.status === 404) {
            setMessage(error.response.data.message);
          } else {
            setProducts(undefined);
            setIsAlertOpened(true);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
  useEffect(() => {
    setMessage("");
    fetchProducts();
    if (products?.length === 0) {
      setMessage("لا توجد منتجات");
    }
  }, [searchParams, categories]);
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
          {(products !== undefined || products == []) &&
            categories.map((category) => (
              <button
                key={category._id ?? 0}
                className={`${
                  selectedCategory === category.name
                    ? "bg-primary text-white"
                    : "bg-alt hover:bg-300"
                } py-2 px-4 radius transition`}
                onClick={() => {
                  if (selectedCategory !== category.name) {
                    setProducts(null);
                    setPagesCount(0);
                    setSearchParams(
                      (prev) => {
                        prev.set("category", category.name);
                        prev.set("page", 1);
                        return prev;
                      },
                      {
                        replace: true,
                      }
                    );
                  }
                }}
              >
                {category.name}
              </button>
            ))}
        </div>
        {/* in case there is no products */}
        {message && <div className="text-start w-full">{message}</div>}
        {/* when loading */}
        {isLoading && <LoadingIcon className="icon" />}
        {/* when products fetched successfully */}
        {!isLoading && products?.length > 0 && (
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
          nextLabel={
            parseInt(page) !== pagesCount ? (
              <NextIcon width={30} className="icon hovered" />
            ) : null
          }
          previousLabel={
            parseInt(page) > 1 ? (
              <PrevIcon width={30} className="icon hovered" />
            ) : null
          }
          onPageChange={(page) => {
            setSearchParams(
              (prev) => {
                prev.set("page", page.selected + 1);
                return prev;
              },
              {
                replace: true,
              }
            );
            window.scrollTo({
              top: productsRef.current.offsetTop - 70,
            });
            setPagesCount(0);
          }}
          pageCount={pagesCount}
          pageRangeDisplayed={2}
          forcePage={parseInt(page) > 1 ? parseInt(page) - 1 : undefined}
          renderOnZeroPageCount={null}
        />
      )}
    </ProductsContext.Provider>
  );
};

export default Products;
