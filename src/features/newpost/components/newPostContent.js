import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import IMAGES from '../../../assets/images/imageStore';
import './newcomponent.scss';
import { TagFacesOutlined } from '@material-ui/icons';
import Picker from 'emoji-picker-react';
import { useSelector } from 'react-redux';

const NewpostContent = ({ valueInput, setValueInput }) => {
    const [showEmoji, setshowEmoji] = useState(false);
    const currentUser = useSelector((state) => state.auth.current);

    console.log(showEmoji);

    const handleEmojiClick = (event, emojiObject) => {
        setValueInput((a) => a + emojiObject.emoji);
        setshowEmoji(false);
    };

    return (
        <div className="newContent">
            <Row>
                <Col md={{ span: 2, offset: 1 }}>
                    <img src={currentUser.avatar} alt="userAvatar" />
                </Col>
                <Col md={{ span: 8 }}>{currentUser.name}</Col>
            </Row>

            <Row>
                <Col md={12}>
                    <textarea
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                        rows="5"
                        placeholder="Viêt chú thích ..."
                    ></textarea>
                </Col>
            </Row>
            <Row>
                <Col md={12} id="emojiIcon">
                    <TagFacesOutlined style={{ color: 'black' }} onClick={() => setshowEmoji(!showEmoji)} />
                </Col>
                {showEmoji && (
                    <Picker
                        onEmojiClick={handleEmojiClick}
                        pickerStyle={{
                            width: '100%',
                            outerHeight: '100%',
                            innerHeight: '100px',
                        }}
                    ></Picker>
                )}
            </Row>
        </div>
    );
};

export default NewpostContent;
