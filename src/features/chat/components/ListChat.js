import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import SingleChat from './SingleChat';
import './Chat.scss';

const ListChat = () => {
    return (
        <div className="leftPanel">
            <div className="leftPanel__title">
                <h6>HoangKhang0410</h6>
                <FontAwesomeIcon icon={faPenToSquare} cursor="pointer" size="lg" />
            </div>
            <ListGroup className="leftPanel__listChat">
                <SingleChat />
                <SingleChat />
                <SingleChat />
                <SingleChat />
                <SingleChat />
                <SingleChat />
                <SingleChat />
                <SingleChat />
                <SingleChat />
                <SingleChat />
                <SingleChat />
            </ListGroup>
        </div>
    );
};

export default ListChat;
