import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { HOST_URL } from "../assets/js/help_func";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(() => Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [creators, setCreators] = useState([]);
  const [refetchHelp, setRefetchHelp ] = useState(false);

  // FUNCTION TO REFETCH
  const handleRefetchHelp = () => {
    setRefetchHelp(!refetchHelp);
  }

  const handleChange = (user, token, creators) => {
    setUser(user);
    setToken(token);
    setCreators(creators);
  };

  const handleUser = (user) => {
    setUser(user);
  };

  const logout = () => {
    fetch(`${HOST_URL()}/users/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Cookies.remove("user");
        Cookies.remove("token");
      })
      .catch((error) => {
        console.error(error);
        Cookies.remove("user");
        Cookies.remove("token");
      });
  };




    // Fetch the list of creators from your API
    const userProfilePicture = () => {
      fetch(`${HOST_URL()}/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const users = data.data.users;
          setCreators(users);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
          console.error("Error fetching creators:", error);
        });
      }
      
      // const shouldKick = (e) => {
  //   if (e.response.data.message) {
  //     if (e.response.data.message == "Unauthenticated.") {
  //       Cookies.remove("user");
  //       Cookies.remove("token");
  //       window.location.href = "/";
  //     }
  //   }
  // };


  // const shouldKick = (e) => {
  //   if (e.response && e.response.data && e.response.data.message) {
  //     if (e.response.data.message === "Unauthenticated.") {
  //       Cookies.remove("user");
  //       Cookies.remove("token");
  //       window.location.href = "/";
  //     }
  //   }
  // };

  useEffect(() => {
    // Storing user and token as JSON strings in cookies
    // Cookies.set("user", JSON.stringify(user));
    // Cookies.set("token", token);

    Cookies.set("user", JSON.stringify(user), { expires: 365 });
    Cookies.set("token", token, { expires: 365 });
  }, [user, token]);

  let contextData = {
    user: user,
    token: token,
    handleChange,
    handleUser,
    logout,
    userProfilePicture,
    refetchHelp,
    handleRefetchHelp,
    
    // shouldKick,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);