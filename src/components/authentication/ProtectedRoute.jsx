// import { useLocation, Navigate, Outlet } from "react-router-dom";

// import { useAuthContext } from "../../context/AuthContext";

// const ProtectedRoute = () => {
//   const location = useLocation();
//   const { user } = useAuthContext();

//   return user ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export const UnProtectedRoute = () => {

//   return <Outlet />;
// };

// export default ProtectedRoute;



import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Spinner from "../Spinner";


const ProtectedRoute = () => {
  let { user, loading } = useAuthContext();

  if (loading) {
    return <Spinner />; // Display a loading screen
  }
  return !user ? <Navigate to="/login" /> : <Outlet />;
};

export const UnProtectedRoute = () => {

  return <Outlet />;
};

export default ProtectedRoute;
