import React from "react";
import { Close } from "@material-ui/icons";
import AccountItem from "./accountItem";
import { useDispatch, useSelector } from "react-redux";
import { HideAllLikesModal } from "../../homeSlice";

const AlllikesPopup = () => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.home.isShowAlllikeModal);

  const HideAlllikesModal = () => {
    const action = HideAllLikesModal();
    dispatch(action);
  };
  return (
    <div className="alllikes" style={{ display: isShow ? "" : "none" }}>
      <div className="alllikes_overlay" onClick={HideAlllikesModal}></div>
      <div className="alllikes_content">
        <div className="alllikes_content_header">
          <p>Lượt thích</p>
          <Close onClick={HideAlllikesModal} />
        </div>
        <div className="alllikes_content_content">
          <AccountItem />
          <AccountItem />
          <AccountItem />
          <AccountItem />
          <AccountItem />
        </div>
      </div>
    </div>
  );
};

export default AlllikesPopup;
