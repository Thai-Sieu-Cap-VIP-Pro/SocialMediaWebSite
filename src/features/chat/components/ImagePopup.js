import { Close } from '@material-ui/icons';
import React from 'react';
import PopupOverlay from '../../../shareComponents/PopupOverlay/PopupOverlay';

const ImagePopup = ({ src, setOpen }) => {
    return (
        <>
            <div id="imagePopup">
                <img src={src} alt="popupImage" />
                <Close id="imagePopup__icon" fontSize="large" onClick={() => setOpen(false)} />
            </div>
            <PopupOverlay onClick={() => setOpen(false)} />
        </>
    );
};

export default ImagePopup;
