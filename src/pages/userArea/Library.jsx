import { useState, useEffect } from 'react'
import Dashboard from './Dashboard'
// import LibraryListingCard from '../../components/General/LibraryListingCard'
// import { usePageContext } from '../../context/PageContext'
// import { useDataContext } from '../../context/DataContext'
import DataTabs from '../../components/DataTabs'
import AllBlogsLibrary from './AllBlogsLibrary';

const Library = () => {
  const [loading, setLoading] = useState(false);
//   const { libraryItems, handleLibraryItems, libraryCategories, handleLibraryCategories } = usePageContext();
//   const { getRequest } = useDataContext();
  const [data, setData] = useState(null);

//   const getLibraryItems = async() => {
//     //if we already have library
//     if (libraryItems) {
//       return setData(libraryItems);
//     }
//     setLoading(true);
//     const result = await getRequest(`client/get-user-library`);
//     if (result) {
//       handleLibraryItems(result.library_items);
//       setData(result.library_items);
//       handleLibraryCategories(result.library_categories);
//     }
//     setLoading(false);
//   }

//   useEffect(() => {
//     getLibraryItems();
//   }, []);

  //tabs component
  const [activeTab, setActiveTab] = useState(0);
  const handleActiveTab = (activeTab) => {
    setActiveTab(activeTab);
  }

  useEffect(() => {
    if (activeTab == 0) {
    //   return setData(libraryItems)
      return setData()
    }
    if (activeTab != 0) {
      let newData = libraryItems.filter((i) => {
        return i.category_id === activeTab
      })
      setData(newData);
    }
  }, [activeTab]);

  return (
    <>
    {
      loading
    }
    <Dashboard>
      <div className='py-6'>
        {/* <DataTabs activeTab={activeTab} handleActiveTab={handleActiveTab} details={libraryCategories}/> */}
      </div>
      

      {/* {
        data?.map((i) => (
          <LibraryListingCard data={i} key={i.id}/>
          ))
        } */}
        <AllBlogsLibrary />
        
    </Dashboard>
    </>
  )
}

export default Library