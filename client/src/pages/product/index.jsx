import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axiosClient from "utils/AxiosClient";

import ReloadBar from "components/ReloadBar";
import Header from "components/header";
import SocialLinks from "./SocialLinks";
import Slider from "./slider";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const fetchProduct = () => {
    axiosClient
      .get(`products/product/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data);
        }
        setIsAlertOpened(false);
      })
      .catch((result) => {
        if (result.response && result.response === 404) {
          setNotFound(true);
        } else {
          setIsAlertOpened(true);
        }
      });
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <Header />
      {/* if not found */}
      {notFound && <Navigate to={"/not-found"} replace={true} />}
      {/* if no internet connection */}
      <div className="container">
        <ReloadBar
          action={fetchProduct}
          isAlertOpened={isAlertOpened}
          setIsAlertOpened={setIsAlertOpened}
        />
      </div>
      {/* if the product is fetched successfully */}
      {product && <Slider files={product?.files} />}
      <section className="container bg-200 p-4 my-5 radius shadow-md">
        <div className="flex justify-between gap-2 px-2 my-4">
          <h1 className="text-3xl">{product?.name}</h1>
          {product?.price && (
            <div>
              <h2 className="bold">السعر:</h2>
              {product?.discount === 0 ? (
                <span className="text-green-800 bold">{product?.price}د.ل</span>
              ) : (
                <div className="text-xl">
                  <span className="price-strike">{product?.price}د.ل</span>
                  <span className="text-green-800 bold">
                    {product.price - (product.price * product?.discount) / 100}
                    د.ل
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <h2 className="bold">الوصف:</h2>
          <p className="my-4  text-md">{product?.description}</p>
          <h2 className="bold">الكمية في المخزن:</h2>
          <p>{product?.stock}</p>
          <SocialLinks />
        </div>
      </section>
    </>
  );
};

export default Product;
