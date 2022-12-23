import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import PopupOverlay from "../../../shareComponents/PopupOverlay/PopupOverlay";

const ImagePopup = ({ src, setOpen }) => {
  return (
    <>
      <div id="imagePopup">
        <img src={src} alt="popupImage" />
        <AiOutlineClose id="imagePopup__icon" onClick={() => setOpen(false)} />
      </div>
      <PopupOverlay onClick={() => setOpen(false)} />
    </>
  );
};

export default ImagePopup;
