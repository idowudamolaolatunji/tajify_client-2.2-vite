import { useState, useEffect, useRef } from "react";
// import Loading from "../Loading/Loading";
// import { useDataContext } from "../context/DataContext";
import FeaturedProductSection from "./FeaturedProductSection";
import { HOST_URL } from "../assets/js/help_func";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const All_PRODUCTS_URL = `${HOST_URL()}/market/getall`;

const Products = () => {
  //   const { getRequest } = useDataContext();
  //   const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();
  const [featuredProducts, setFeaturedProducts] = useState(null);
  const [featuredCategories, setFeaturedCategories] = useState(null);

  //   const getFeaturedProducts = async () => {
  //     const result = await getRequest("market/getall");

  //     if (result.data.products) {
  //       setFeaturedProducts(result.data.products);
  //     }
  //   };
  //   console.log(featuredProducts);

  //   const getAllProducts = async () => {
  //     const result = await getRequest("market/getall");
  //     if (result.data.products) {
  //       setFeaturedCategories(result.data.products);
  //     }
  //     console.log(result);
  //   };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/market/getall",
          {
            // const response = await axios.get(All_PRODUCTS_URL, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
        if (response.data.data.products) {
          setFeaturedProducts(response.data.data.products);
        } else {
          console.error("Error fetching posts");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    console.log(featuredProducts)


  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    //   getFeaturedProducts();
    //   getAllProducts();
    fetchData();
  }, []);

  return (
    <>
      {/* {loading && <Loading />} */}
      {featuredProducts ? (
        <FeaturedProductSection
          name={"Featured Products"}
          data={featuredProducts && featuredProducts}
        />
      ) : (
        // ))
        <p>No products Available</p>
      )}
    </>
  );
};

export default Products;
