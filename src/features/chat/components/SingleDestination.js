import React, { useState } from 'react';
import { CheckCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createTag, deleteTag } from '../ChatSlice';
const SingleDestination = ({ follow }) => {
    const dispatch = useDispatch();
    const tags = useSelector((state) => state.chat.tags);
    const handleSelect = () => {
        dispatch(createTag(follow));
    };
    const handleUnselect = () => {
        dispatch(deleteTag(follow._id));
    };
    console.log(typeof follow);
    return (
        <div className="messagePopup__destinationList__singleDestination">
            <div className="messagePopup__destinationList__singleDestination__avatar">
                <img src={follow.avatar} alt="avatar_user" />
            </div>
            <div className="messagePopup__destinationList__singleDestination__info">
                <p>{follow.name}</p>
                <p>{follow.email}</p>
            </div>
            {tags.includes(follow) ? (
                <CheckCircle style={{ width: '27px', height: '27px' }} onClick={handleUnselect} />
            ) : (
                <div className="messagePopup__destinationList__singleDestination__dot" onClick={handleSelect}></div>
            )}
        </div>
    );
};

export default SingleDestination;
