import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import SingleChat from './SingleChat';
import { getAllConversations } from '../ChatSlice';
import './Chat.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const ListChat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const conversations = useSelector((state) => state.chat.conversations);
    const currentUser = useSelector((state) => state.auth.current);
    const [id, setId] = useState('');

    const handleClick = (id) => {
        navigate(`${id}`);
    };

    useEffect(() => {
        dispatch(getAllConversations())
            .unwrap()
            .then((resultValue) => console.log(resultValue))
            .catch((rejectedValue) => console.log(rejectedValue));
    }, []);

    return (
        <div className="leftPanel">
            <div className="leftPanel__title">
                <h6>{currentUser.name}</h6>
                <FontAwesomeIcon icon={faPenToSquare} cursor="pointer" size="lg" />
            </div>
            <ListGroup className="leftPanel__listChat">
                {conversations.map((conversation) => {
                    return (
                        <NavLink to={`${conversation._id}`} key={conversation._id}>
                            <SingleChat
                                {...conversation}
                                // handleClick={handleClick}
                                setId={setId}
                                activeChat={id == conversation._id ? true : false}
                            />
                        </NavLink>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default ListChat;
