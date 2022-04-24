import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const SingleChat = ({ _id, name, handleClick, setId, activeChat }) => {
    const [active, setActive] = useState(false);
    const handleClickSingleChat = () => {
        setId(_id);
        handleClick(_id);
    };

    return (
        <ListGroup.Item className="singleChat">
            <div className="singleChat__image">
                <img src="https://source.unsplash.com/random/50×50" alt="unsplash" />
            </div>
            <div className="singleChat__user">
                <h6 className="singleChat__user__name">{name}</h6>
                <div className="singleChat__user__content">
                    <p className="singleChat__user__content__summary">Chào cậu! Lâu rồi không gặppppp </p>
                    <span className="singleChat__user__content__time">•1m</span>
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default SingleChat;
