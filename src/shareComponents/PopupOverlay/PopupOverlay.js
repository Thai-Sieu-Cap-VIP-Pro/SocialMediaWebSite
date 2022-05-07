import React from 'react';
import './PopupOverlay.scss';
const PopupOverlay = ({ onClick = null }) => {
    return <div id="PopupOverlay" onClick={onClick}></div>;
};

export default PopupOverlay;
