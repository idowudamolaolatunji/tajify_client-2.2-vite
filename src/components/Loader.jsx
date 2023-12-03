import React from "react";
import Spinner from "./Spinner";
import "../assets/css/loader.css";

const Loader = () => {
  return (
    <>
      <div className="loader">
        <div className="flexx">
      {/* <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-white">
        <div className="h-screen flex justify-center items-center"> */}
          <Spinner />
        </div>
      </div>
    </>
  );
};

export default Loader;
