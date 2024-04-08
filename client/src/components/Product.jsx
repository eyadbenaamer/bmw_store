import { useEffect } from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const {
    _id: id,
    name,
    description,
    price,
    discount,
    category,
    files,
  } = props.data;
  return (
    <div className="product flex flex-col relative shadow-md radius overflow-hidden">
      {discount > 0 && <div className="discount">{` تخفيض ${discount}%`}</div>}

      <Link
        className="h-[200px] image-container"
        aria-label={`صفحة المنتج ${name}`}
        to={`/product/${id}`}
      >
        {files[0].fileType === "photo" ? (
          <img className=" " src={files[0].path} alt={name} />
        ) : (
          <video src={files[0].path} />
        )}
      </Link>
      <div className=" h-[170px] bg-200 flex flex-col gap-2 justify-between p-4">
        <div className="flex justify-between items-center text-xl my-1 md:text-base">
          <Link to={`/product/${id}`}>
            <h1 className="transition hover:text-[var(--primary-color)] hover:underline underline-offset-4">
              {name}
            </h1>
          </Link>
          {discount === 0 ? (
            <span className="text-green-800 bold">{price}د.ل</span>
          ) : (
            <div className="text-sm">
              <span className="price-strike">{price}د.ل</span>
              <span className="text-green-800 bold">
                {price - (price * discount) / 100}د.ل
              </span>
            </div>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-400 overflow-hidden">{description}</p>
        )}
        <span className="p-2 bg-alt w-fit radius">
          {category?.name ?? "أخرى"}
        </span>
      </div>
    </div>
  );
};

export default Product;
