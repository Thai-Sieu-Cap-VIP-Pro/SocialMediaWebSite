import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideReportModal } from "../homeSlice";
import "./post.scss";

const ReportModal = () => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.home.isShowReportModal);

  const HideModal = () => {
    const action = HideReportModal();
    dispatch(action);
  };

  return (
    <div className="report" style={{ display: isShow ? "" : "none" }}>
      <div className="report__layout" onClick={HideModal}></div>
      <div className="report__content">
        <ul>
          <li>Report</li>
          <li>Unfollow</li>
        </ul>
      </div>
    </div>
  );
};

export default ReportModal;
