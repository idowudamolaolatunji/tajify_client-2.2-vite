import React from "react";

const CardPage = ({children}) => {
  return (
    <div className="bg-white mt-10 seye-shadow border-[1px] lg:m-10 rounded-xl lg:p-6 max-md:p-2">
        {children}
    </div>
  );
};

export default CardPage;