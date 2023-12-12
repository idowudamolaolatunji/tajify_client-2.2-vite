import React from "react";
import moment from "moment/moment";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import MyOrderCard from "./MyOrderCard";

const MyOrderSection = ({ data }) => {
  return (
    <div>
      <div className="top-row mb-10 border-[2px] rounded-lg p-3">
        <div className="lg:flex lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {data?.created_at &&
                moment(data?.created_at).format("dddd Do [of] MMMM YYYY")}
            </h3>
            <h4 className=" text-xs font-semibold">
              Order No:<span className="text-primary">{data?.tracking_id}</span>
            </h4>
          </div>
          <Link to={`${data?.tracking_id}`}>
            <button className="bg-primary text-white px-4 py-2 rounded-lg max-h-[40px] text-sm font-semibold">
              {" "}
              <span className="flex gap-2">
                View Details
                <HiArrowNarrowRight size={18} />
              </span>
            </button>
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-5 lg:gap-3">
          <MyOrderCard product={data && data} />
        </div>
      </div>
    </div>
  );
};

export default MyOrderSection;
