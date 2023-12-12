import { createContext, useContext, useState } from "react";

const PageContext = createContext();

export default PageContext;

export const PageProvider = ({ children }) => {
  //states i want to keep
  
    //library page states
  const [libraryItems, setLibraryItems] = useState(null);
  const handleLibraryItems = (libraryItems) => {
    setLibraryItems(libraryItems);
  }

  const [libraryCategories, setLibraryCategories] = useState(null);
  const handleLibraryCategories = (libraryCategories) => {
    setLibraryCategories(libraryCategories);
  };
  

  //my orders
  const [allOrders, setAllOrders] = useState(null);
  const handleAllOrders = (allOrders) => {
    setAllOrders(allOrders);
  };
  

  let contextData = {
   libraryItems,
   handleLibraryItems,
   libraryCategories,
   handleLibraryCategories,
   allOrders,
   handleAllOrders,
  };

  return (
    <PageContext.Provider value={contextData}>{children}</PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);
