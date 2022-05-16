import React from 'react';
import PopupOverlay from '../PopupOverlay/PopupOverlay';
import './WarningPopup.scss';

const WarningPopup = ({ content = '', title = '', handleOK, handleCANCEL }) => {
    return (
        <>
            <div id="warningPopup">
                <div id="warningPopup__content">
                    <h4>{title}</h4>
                    <p>{content}</p>
                </div>
                <div id="warningPopup__button">
                    <button onClick={handleOK}>OK</button>
                    <button onClick={handleCANCEL}>CANCEL</button>
                </div>
            </div>
            <PopupOverlay onClick={handleCANCEL} />
        </>
    );
};

export default WarningPopup;
