import React from 'react';

const SingleDestination = ({ follow, setTags }) => {
    const handleClick = () => {
        setTags((prev) => [...prev, follow]);
    };
    console.log(typeof follow);
    return (
        <div className="messagePopup__destinationList__singleDestination">
            <div className="messagePopup__destinationList__singleDestination__avatar">
                <img src="https://source.unsplash.com/random/50×50" alt="avatar_user" />
            </div>
            <div className="messagePopup__destinationList__singleDestination__info">
                <p>{follow.name}</p>
                <p>{follow.email}</p>
            </div>
            <div className="messagePopup__destinationList__singleDestination__dot" onClick={handleClick}></div>
        </div>
    );
};

export default SingleDestination;
