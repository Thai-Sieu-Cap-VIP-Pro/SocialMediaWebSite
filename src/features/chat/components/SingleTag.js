import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTag } from '../ChatSlice';

const SingleTag = ({ tag }) => {
    const dispatch = useDispatch();
    const handleClick = (id) => {
        dispatch(deleteTag(id));
    };
    return (
        <div className="messagePopup__destinations__tags__singleTag">
            <p>{tag.name}</p>
            <button onClick={() => handleClick(tag._id)}>x</button>
        </div>
    );
};

export default SingleTag;
