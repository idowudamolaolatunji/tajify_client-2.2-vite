import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

const DataContext = createContext();

export default DataContext;

export const DataProvider = ({ children }) => {
  //states i want to keep
  const { token, shouldKick } = useAuthContext();

  //for pop up modals and other general continuos functions
  const [move, setMove] = useState(false);
  const [allBrands, setAllBrands] = useState(null);
  const [query, setQuery] = useState("");
  const [cachedRoute, setCachedRoute] = useState("");
  const [notify, setNotify] = useState(false);
  const [tajiRate, setTajiRate] = useState(null);
  const [dollarNairaRate, setDollarNairaRate] = useState(null);

  const getCurrencyRate = async () => {
    // const result = await getRequest(`market/currencies`);
    const result = await axios.get("http://localhost:3005/api/market/currencies");
    if (result) {
      console.log(result);
      // result.map((i) => {
        // if (i.currency_name == "TAJI") {
        if (result.currency_name == "TAJI") {
          return setTajiRate(i.rate);
        // } else if (i.currency_name == "DOLLAR_NAIRA") {
        } else if (result.currency_name == "DOLLAR_NAIRA") {
          return setDollarNairaRate(i.rate);
        }
        console.log(result)
      // });
      // });
    }
  };

  useEffect(() => {
    getCurrencyRate();
  }, []);


  const nairaToTajiEquivalent = (nairaValue) => {
    if (dollarNairaRate == null || tajiRate == null) {
     // getCurrencyRate();
      return null;
    }
    const usdValue = nairaValue / dollarNairaRate;

    // Calculate TAJI equivalent for the USD value
    const tajiEquivalent = usdValue / tajiRate;

    return tajiEquivalent.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const nairaToTajiEquivalentRaw = (nairaValue) => {
    if (dollarNairaRate == null || tajiRate == null) {
     // getCurrencyRate();
      return null;
    }
    const usdValue = nairaValue / dollarNairaRate;

    // Calculate TAJI equivalent for the USD value
    const tajiEquivalent = usdValue / tajiRate;

    return tajiEquivalent.toFixed(2);
  };

  const handleMove = (bool) => {
    setMove(bool);
  };

  const handleQuery = (search) => {
    setQuery(search);
  };

  const handleAllBrands = (brands) => {
    setAllBrands(brands);
  };

  const handleCachedRoute = (route) => {
    setCachedRoute(route);
  };

  const handleNotify = (bool) => {
    setNotify(bool);
  };

  // const deleteRequest = (route, id) => {
  //   const url = `${import.meta.env.VITE_SERVER_URL}/${route}/${id}`;
  //   return axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       return true;
  //     })
  //     .catch((err) => {
  //       shouldKick(err);
  //       return false;
  //     });
  // };

  // const getRequest = (route) => {
  //   const url = `${import.meta.env.VITE_SERVER_URL}/${route}`;
  //   // const url = `${import.meta.env.VITE_SERVER_URL}`;
  //   return axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       return response.data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       shouldKick(err);
  //       return false;
  //     });
  // };

  // const getMarketRequest = (route) => {
  //   const url = `${import.meta.env.VITE_SERVER_URL}/users`;
  //   // const url = `${import.meta.env.VITE_SERVER_URL_MARKET}`;
  //   return axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data.data.users);
  //       return response.data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       shouldKick(err);
  //       return false;
  //     });
  // };

  // const showRequest = (route, id) => {
  //   const url = `${import.meta.env.VITE_SERVER_URL}/${route}/${id}`;
  //   return axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       return response.data;
  //     })
  //     .catch((err) => {
  //       shouldKick(err);
  //       return false;
  //     });
  // };

  // const postRequest = (route, data) => {
  //   var config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: `${import.meta.env.VITE_SERVER_URL}/${route}`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: data,
  //   };

  //   return axios(config)
  //     .then(function (response) {
  //       console.log(response.data);
  //       return response.data;
  //     })
  //     .catch(function (e) {
  //       console.log(e.response.data.message);
  //       shouldKick(e);
  //       return false;
  //     });
  // };

  // const postRequestFeedback = (route, data) => {
  //   var config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: `${import.meta.env.VITE_SERVER_URL}/${route}`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: data,
  //   };

  //   return axios(config)
  //     .then(function (response) {
  //       console.log(response.data);
  //       return response.data;
  //     })
  //     .catch(function (e) {
  //       console.log(e.response.data.message);
  //       shouldKick(e);
  //       return e.response.data;
  //     });
  // };

  let contextData = {
    move,
    handleMove,
    allBrands,
    handleAllBrands,
    // deleteRequest,
    // getRequest,
    // getMarketRequest,
    // postRequest,
    // postRequestFeedback,
    // showRequest,
    query,
    handleQuery,
    cachedRoute,
    handleCachedRoute,
    notify,
    handleNotify,
    nairaToTajiEquivalent,
    nairaToTajiEquivalentRaw
  };

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
