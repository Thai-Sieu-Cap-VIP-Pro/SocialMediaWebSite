import React from "react";


const SettingModal = ( props) => {

  return (
    <div className="report" >
      <div className="report__layout" onClick={ props.handlePopup }></div>
      <div className="report__content">
        <ul>
          <li>Change Password</li>
          <li>login Setting</li>
          <li>Notification</li>
          <li>Log Out</li>
        </ul>
      </div>
    </div>

  );
};

export default SettingModal;
