import React, { useState } from 'react';
import { CheckCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createTag, deleteTag } from '../ChatSlice';
const SingleDestination = ({ follow, forRenderSearch = false }) => {
    const dispatch = useDispatch();
    const tags = useSelector((state) => state.chat.tags);
    const handleSelect = (e) => {
        e.stopPropagation();
        dispatch(createTag(follow));
    };
    const handleUnselect = (e) => {
        e.stopPropagation();
        dispatch(deleteTag(follow._id));
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if (!forRenderSearch) {
            const temp = tags.find((tag) => {
                return tag._id === follow._id;
            });
            if (temp) {
                handleUnselect(e);
            } else {
                handleSelect(e);
            }
        } else {
        }
    };

    console.log(typeof follow);
    return (
        <div className="messagePopup__destinationList__singleDestination" onClick={handleClick}>
            <div className="messagePopup__destinationList__singleDestination__avatar">
                <img src={follow.avatar} alt="avatar_user" />
            </div>
            <div className="messagePopup__destinationList__singleDestination__info">
                <p>{follow.name}</p>
                <p>{follow.email}</p>
            </div>
            {!forRenderSearch ? (
                tags.includes(follow) ? (
                    <CheckCircle style={{ width: '27px', height: '27px' }} onClick={handleUnselect} />
                ) : (
                    <div className="messagePopup__destinationList__singleDestination__dot" onClick={handleSelect}></div>
                )
            ) : (
                ''
            )}
        </div>
    );
};

export default SingleDestination;
