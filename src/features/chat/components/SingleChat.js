import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SingleChat = () => {
    return (
        <ListGroup.Item className="singleChat">
            <div className="singleChat__image">
                <img src="https://source.unsplash.com/random/50×50" alt="unsplash" />
            </div>
            <div className="singleChat__user">
                <h6 className="singleChat__user__name">Người lạ từng quennnnnnnnnnnnnnnnnnnn:3</h6>
                <div className="singleChat__user__content">
                    <p className="singleChat__user__content__summary">Chào cậu! Lâu rồi không gặppppp </p>
                    <span className="singleChat__user__content__time">•1m</span>
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default SingleChat;
