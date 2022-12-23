import React from "react";
import AccountItem from "./accountItem";
import { useDispatch, useSelector } from "react-redux";
import { HideAllLikesModal } from "../../homeSlice";
import { Spinner } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";

const AlllikesPopup = () => {
  const dispatch = useDispatch();
  const { listLikeCmt } = useSelector((state) => state.home);
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

          <AiOutlineClose onClick={HideAlllikesModal} />
        </div>
        <div className="alllikes_content_content">
          {listLikeCmt.isLoad ? (
            <div className="spinner_wrap">
              <Spinner className="spinner" animation="border" size="sm" />
            </div>
          ) : (
            <>
              {listLikeCmt.listUsers.map((user, index) => {
                return <AccountItem key={index} user={user} />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlllikesPopup;
