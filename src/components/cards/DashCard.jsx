import { FaRegMoneyBillAlt } from "react-icons/fa";
import Currency from "react-currency-formatter";
const DashCard = () => {
  return (
    <div className="w-full p-2 lg:w-1/3 md:w-1/2">
      <div
        // className={`flex flex-col px-6 py-10 overflow-hidden bg-gradient-to-br from-[#f1544a]  to-secondary rounded  shadow-lg duration-300 hover:shadow-2xl group`}
        className={`flex flex-col px-6 py-10 overflow-hidden bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 rounded  shadow-lg duration-300 hover:shadow-2xl group`}
      >
        <div className="flex flex-row justify-between items-center" >
        <div className="px-4 py-4 bg-blue-200  rounded-xl bg-opacity-30">
            <FaRegMoneyBillAlt className="text-white" size={24} />
          </div>
        </div>
        <h1 className="text-gray-100 font-bold text-base my-2">Available Taji Balance</h1>
        <h4 className="text-gray-100 font-semibold text-3xl">
          {/* <Currency quantity={data.balance} currency="NGN" /> */}
          <Currency quantity={100} currency="NGN"  />
        </h4>
      </div>
    </div>
  );
};

export default DashCard;