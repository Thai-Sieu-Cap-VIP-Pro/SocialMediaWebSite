import React from "react";
import IMAGES from "../../assets/images/imageStore";
import "./notfound.scss";

const NotFound = () => {
  console.log("not found");
  return (
    <div className="notfound">
      <img src={IMAGES.notfound} alt="" />
    </div>
  );
};

export default NotFound;
