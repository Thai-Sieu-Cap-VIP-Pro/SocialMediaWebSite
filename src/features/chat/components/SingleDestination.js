import React, { useState } from 'react';
import { CheckCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createTag, deleteTag } from '../ChatSlice';
const SingleDestination = ({ follow, forRenderSearch = false, isForward = false }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.current);
    const tags = useSelector((state) => state.chat.tags);
    const handleSelect = (e) => {
        e.stopPropagation();
        if (!isForward) {
            dispatch(createTag(follow));
        } else {
            const { name, ...others } = follow;

            const newName = follow?.name
                ? follow?.name
                : follow?.members.length === 2
                ? follow?.members.find((item) => item._id !== currentUser._id).name
                : follow?.members.length === 1
                ? 'Không còn ai muốn trò chuyện với bạn nữa'
                : follow?.members
                      .filter((item) => item._id !== currentUser._id)
                      .map((member) => member.name)
                      .join(', ');
            dispatch(createTag({ name: newName, ...others }));
        }
    };
    const handleUnselect = (e) => {
        e.stopPropagation();
        dispatch(deleteTag(follow._id));
    };

    const handleClick = (e) => {
        if (!forRenderSearch) {
            e.stopPropagation();
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
                {!isForward ? (
                    <img src={follow.avatar} alt="avatar_user" />
                ) : (
                    <img
                        src={`${
                            follow?.avatar
                                ? follow?.avatar
                                : follow?.members.length === 2
                                ? follow?.members.find((item) => item._id !== currentUser._id).avatar
                                : follow?.members.length === 1
                                ? 'https://res.cloudinary.com/wjbucloud/image/upload/v1653282748/haha_axj617.jpg'
                                : 'https://res.cloudinary.com/wjbucloud/image/upload/v1651308420/j2team_girl_8_btpoep.jpg'
                        }`}
                        alt="unsplash"
                    />
                )}
            </div>
            <div className="messagePopup__destinationList__singleDestination__info">
                {!isForward ? (
                    <p>{follow.name}</p>
                ) : (
                    <p>
                        {follow?.name
                            ? follow?.name
                            : follow?.members.length === 2
                            ? follow?.members.find((item) => item._id !== currentUser._id).name
                            : follow?.members.length === 1
                            ? 'Không còn ai muốn trò chuyện với bạn nữa'
                            : follow?.members
                                  .filter((item) => item._id !== currentUser._id)
                                  .map((member) => member.name)
                                  .join(', ')}
                    </p>
                )}
                <p>{follow.email}</p>
            </div>
            {!forRenderSearch ? (
                tags
                    .map((tag) => {
                        return tag._id;
                    })
                    .includes(follow._id) ? (
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
