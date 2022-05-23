import React, { useEffect, useState } from 'react';
import { Close } from '@material-ui/icons';
import { Col, Container, Row } from 'react-bootstrap';
import SingleTag from './SingleTag';
import SingleDestination from './SingleDestination';
import { createConversation, getUserContact } from '../ChatSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetTag } from '../ChatSlice';
import PopupOverlay from '../../../shareComponents/PopupOverlay/PopupOverlay';

const MessagePopup = ({ setIsShowPopup }) => {
    const currentUser = useSelector((state) => state.auth.current);
    const userContact = useSelector((state) => state.chat.userFollowing);
    const [searchValue, setSearchValue] = useState('');
    const listUser = useSelector((state) => state.auth.listUser).filter((user) => user._id !== currentUser._id);
    const [bruh, setBruh] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tags = useSelector((state) => state.chat.tags);
    const conversations = useSelector((state) => state.chat.conversations);

    const handleClick = () => {
        let exist = [];
        if (conversations.length !== 0) {
            exist = conversations.filter((conversation) => {
                const condition1 = conversation.members.length - 1 === tags.length;
                if (condition1) {
                    const tagIds = tags.map((tag) => tag._id);
                    const condition2 = tagIds.every((tagId) => {
                        return conversation.members.some((member) => {
                            return member._id === tagId;
                        });
                    });
                    if (condition2) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
        }
        if (exist.length !== 0) {
            navigate(`${exist[0]._id}`);
        } else {
            dispatch(createConversation({ users: tags }))
                .unwrap()
                .then((resultValue) => {
                    navigate(`${resultValue.conversation._id}`);
                })
                .catch((rejectedValue) => console.log(rejectedValue));
        }

        handleClosePopup();
    };

    const handleClosePopup = () => {
        dispatch(resetTag());
        setIsShowPopup(false);
    };

    useEffect(() => {
        dispatch(getUserContact())
            .unwrap()
            .then((resultValue) => console.log(resultValue))
            .catch((rejectedValue) => console.log(rejectedValue));
        console.log(tags);
    }, []);

    const handleSearch = (searchValue) => {
        setSearchValue(searchValue);
        const searchUser = listUser.filter((user) => {
            if (user.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return user;
            }
        });
        console.log(searchUser);
        setBruh(searchUser);
    };

    return (
        <>
            <PopupOverlay onClick={handleClosePopup} />
            <div className="messagePopup">
                <div className="messagePopup__titleContainer">
                    <Close onClick={handleClosePopup} fontSize="large" style={{ cursor: 'pointer' }} />
                    <h5>New Message</h5>
                    <button
                        className={`messagePopup__titleContainer__button ${tags.length === 0 ? 'disabled' : ''}`}
                        onClick={handleClick}
                    >
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
                                          return <SingleTag key={index} tag={tag} />;
                                      })}
                            </Row>
                            <Row className="messagePopup__destinations__input">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchValue}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <div className="messagePopup__destinationList">
                    <h6 style={{ padding: '10px 20px 10px 20px' }}>Suggested</h6>
                    {searchValue === ''
                        ? userContact.map((follow, index) => {
                              return <SingleDestination follow={follow} key={index} />;
                          })
                        : bruh.map((user, index) => {
                              return <SingleDestination follow={user} key={index} />;
                          })}
                </div>
            </div>
        </>
    );
};

export default MessagePopup;
