import React from "react";
import { Close } from "@material-ui/icons";
import AccountItem from "./accountItem";
import { useDispatch, useSelector } from "react-redux";
import { HideAllLikesModal } from "../../homeSlice";

const AlllikesPopup = () => {
  const dispatch = useDispatch();
  const { listLikeCmt } = useSelector((state) => state.home);

  console.log(listLikeCmt);

  const HideAlllikesModal = () => {
    const action = HideAllLikesModal();
    dispatch(action);
  };
  return (
    <div
      className="alllikes"
      style={{ display: listLikeCmt.isShowAlllikeModal ? "" : "none" }}
    >
      <div className="alllikes_overlay" onClick={HideAlllikesModal}></div>
      <div className="alllikes_content">
        <div className="alllikes_content_header">
          <p>Lượt thích ({listLikeCmt.listUsers.length})</p>
          <Close onClick={HideAlllikesModal} />
        </div>
        <div className="alllikes_content_content">
          {listLikeCmt.listUsers.map((user, index) => {
            return <AccountItem key={index} user={user} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AlllikesPopup;
