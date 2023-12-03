import React from "react";
import Currency from "react-currency-formatter";
import { Link } from "react-router-dom";
import { calculateDiscount, truncateString } from "../assets/js/help_func";
// import {useDataContext} from "../context/DataContext"
import { useDataContext } from "../context/DataContext";



const FpCard = ({ product }) => {
  // const { nairaToTajiEquivalent } = useDataContext();
  return (
    <Link
      to={
        product?.type == "simple"
          ? `"https://tajify.com/products/${product?.slug}`
          // : `/v-products/${product.slug}`
          : `https://tajify.com/v-products/${product._id}`
      }
    >
      <div className="flex flex-col items-start py-[13px] px-[10px] gap-[6px] isolate relative w-[154px] max-sm:w-[130px] bg-white rounded-[10px] my-2 transition-all hover:shadow-lg hover:-translate-y-1">
        {/* <img
          src={product.image}/${product?.image[0]}`}
          alt=""
          className="w-[130px] h-[130px] max-sm:w-[80px]  max-sm:h-[80px] object-cover"
        /> */}
        <img
          src={product.image}
          alt=""
          className="w-[130px] h-[130px] max-sm:w-[80px]  max-sm:h-[80px] object-cover"
        />
        <div className="product-txt-div flex flex-col gap-[6px]">
          <p className="text-sm max-sm:text-xs h-[40px]">
            {truncateString(product?.name, 25)}
          </p>
          <p className="font-bold text-base max-sm:text-sm">
            <Currency quantity={product?.price} currency="NGN" /> 
          </p>
          <p className=" text-xs line-through font-light">
            <Currency quantity={product?.slashed_price} currency="NGN" />
          </p>

          <p className=" text-green-600 text-sm max-sm:text-xs font-semibold">
            {/* TAJI {nairaToTajiEquivalent(product?.price)} */}
          </p>
        </div>
        <div className="discount absolute w-[18px] h-[17px] top-[3px] right-[3px] bg-[#ff0066] flex justify-center items-center rounded-full p-6 max-sm:p-4">
          <p className="text-white text-sm max-sm:text-xs">
            {/* -{calculateDiscount(product?.price, product?.slashed_price)}% */}
            {calculateDiscount(product?.price, product?.slashed_price)}%
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FpCard;
