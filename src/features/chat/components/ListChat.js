import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import SingleChat from './SingleChat';
import { getAllConversations } from '../ChatSlice';
import './Chat.scss';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { socket } from '../pages/ChatPage';

const ListChat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const conversations = useSelector((state) => state.chat.conversations);
    const currentUser = useSelector((state) => state.auth.current);
    const params = useParams();
    const [id, setId] = useState('');

    const handleClick = (id) => {
        // socket.emit('disconnect', params.id);
        // socket.emit('leaveRoom', params['*']);
        navigate(`${id}`);
        console.log(params);
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
                        <SingleChat
                            {...conversation}
                            handleClick={handleClick}
                            setId={setId}
                            activeChat={id === conversation._id ? true : false}
                        />
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default ListChat;
