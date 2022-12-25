import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const TextError = (props) => {
  return (
    <div className="error">
      <RiErrorWarningLine />
      <span className="error__text">{props.children}</span>
    </div>
  );
};

export default TextError;
