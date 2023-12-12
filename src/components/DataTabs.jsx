import React from "react";

const DataTabs = ({ activeTab, handleActiveTab, details }) => {
  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
        <li className="mr-2">
          <div
          onClick={() => handleActiveTab(0)}
            className={`inline-block cursor-pointer px-4 py-3  rounded-lg bg-gray-100 ${
              activeTab == 0 && "text-white bg-primary"
            }`}
          >
            All
          </div>
        </li>

        {details?.map((i) => (
          <li className="mr-2" key={i.id}>
            <div
              onClick={() => handleActiveTab(i.id)}
              className={`inline-block cursor-pointer px-4 py-3 rounded-lg bg-gray-100 ${
                activeTab == i.id && "text-white bg-primary"
              }`}
            >
              {i.category_name}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DataTabs;
