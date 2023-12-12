import React from "react";
// import { truncateString, calculateDiscount } from "../../utils/Helpers";
import Currency from "react-currency-formatter";
import { Link } from "react-router-dom";
const MyOrderCard = ({ product }) => {
  const { VITE_FULL_URL, VITE_IMAGE_URL } = import.meta.env;
  return (
    <Link >
      <div className="flex flex-col items-start py-[13px] px-[10px] gap-[6px] isolate relative w-[154px] bg-white rounded-[10px] hover:scale-110 transition-all hover:transition-all hover:rounded-[10px] hover:shadow-md">
        {
          product && <img
          src={`${VITE_FULL_URL}/${VITE_IMAGE_URL}/${
            JSON.parse(product?.images)[0]
          }`}
          alt=""
          className="w-[130px] h-[130px] object-cover"
        />
        }
        <div className="product-txt-div flex flex-col gap-[6px]">
          <p className="text-sm h-[40px]">
            {truncateString(product?.product_name, 25)}
          </p>
          <p className="font-bold text-base">
            <Currency quantity={product?.price} currency="NGN" />
          </p>
          <p className=" text-sm text-primary  font-semibold flex gap-2">
            Qty: {product?.quantity} { product?.size && <><span>Size:{product?.size} </span></>}
          </p>
        </div>
       
      </div>
    </Link>
  );
};

export default MyOrderCard;
