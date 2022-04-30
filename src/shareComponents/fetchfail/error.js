import React from "react";
import IMAGES from "../../assets/images/imageStore";
import "./error.scss";

const ErrorFetch = () => {
  return (
    <div className="errorWrap">
      <img src={IMAGES.error} alt="" />
    </div>
  );
};

export default ErrorFetch;
