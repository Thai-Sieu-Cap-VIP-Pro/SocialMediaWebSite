import React, { useEffect, useState } from 'react';
import { Close } from '@material-ui/icons';
import { Col, Container, Row } from 'react-bootstrap';
import SingleTag from './SingleTag';
import SingleDestination from './SingleDestination';
import { createConversation, getUserContact } from '../ChatSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MessagePopup = ({ setIsShowPopup }) => {
    const currentUser = useSelector((state) => state.auth.current);
    const userContact = useSelector((state) => state.chat.userFollowing);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tags, setTags] = useState([]);
    const handleClick = () => {
        dispatch(createConversation({ users: tags }))
            .unwrap()
            .then((resultValue) => {
                navigate(`${resultValue.newConversation._id}`);
            })
            .catch((rejectedValue) => console.log(rejectedValue));
    };

    useEffect(() => {
        dispatch(getUserContact())
            .unwrap()
            .then((resultValue) => console.log(resultValue))
            .catch((rejectedValue) => console.log(rejectedValue));
        console.log(tags);
    }, []);

    return (
        <>
            <div className="messagePopupOverlay"></div>
            <div className="messagePopup">
                <div className="messagePopup__titleContainer">
                    <Close onClick={() => setIsShowPopup(false)} fontSize="large" />
                    <h5>New Message</h5>
                    <button className="messagePopup__titleContainer__button" onClick={handleClick}>
                        Next
                    </button>
                </div>
                <Container className="messagePopup__destinations" fluid="md">
                    <Row style={{ padding: '10px 0' }}>
                        <Col md={2}>
                            <h5>To: </h5>
                        </Col>
                        <Col md={10}>
                            <Row className="messagePopup__destinations__tags">
                                {tags.lenght === 0
                                    ? ''
                                    : tags.map((tag, index) => {
                                          return <SingleTag key={index} tag={tag} setTags={setTags} tags={tags} />;
                                      })}
                            </Row>
                            <Row className="messagePopup__destinations__input">
                                <input type="text" placeholder="Tìm kiếm..." />
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <div className="messagePopup__destinationList">
                    <h6 style={{ margin: '20px 0' }}>Suggested</h6>
                    {userContact.map((follow, index) => {
                        return <SingleDestination follow={follow} key={index} setTags={setTags} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default MessagePopup;
