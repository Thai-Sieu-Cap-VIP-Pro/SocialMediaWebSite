import React from 'react';

const SingleTag = ({ tag, setTags, tags }) => {
    const handleClick = (id) => {
        const newTags = tags.filter((e) => e._id !== id);
        setTags(newTags);
    };
    return (
        <div className="messagePopup__destinations__tags__singleTag">
            <p>{tag.name}</p>
            <button onClick={() => handleClick(tag._id)}>x</button>
        </div>
    );
};

export default SingleTag;
