import { Close } from '@material-ui/icons';
import React from 'react';

const ImagePopup = ({ src, setOpen }) => {
    return (
        <>
            <div id="imagePopup">
                <img src={src} alt="popupImage" />
                <Close id="imagePopup__icon" fontSize="large" onClick={() => setOpen(false)} />
            </div>
            <div id="imagePopupOverlay" onClick={() => setOpen(false)}></div>
        </>
    );
};

export default ImagePopup;
