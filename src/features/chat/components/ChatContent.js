import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faFaceGrinWide, faImage, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { EmojiEmotionsOutlined, Reply, MoreHoriz } from '@material-ui/icons';
import Picker from 'emoji-picker-react';
import './Chat.scss';

const ChatContent = () => {
    const [text, setText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
    const [data, setData] = useState([]);
    // const [isShow, setIsShow] = useState(false);
    // const target = useRef(null);
    const ref = useRef();

    const handleClickEmoji = () => {
        setIsOpenEmojiPicker(!isOpenEmojiPicker);
    };

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [data]);

    const handleChange = (e) => {
        if (!e.target.value) {
            setIsTyping(false);
            setText('');
        } else {
            setIsTyping(true);
            setText(e.target.value);
        }
    };
    const handleSubmit = () => {
        setData([...data, text]);
        setText('');
        setIsTyping(false);
    };
    return (
        <div className="rightPanel">
            <div className="rightPanel__title">
                <div className="rightPanel__title__user">
                    <div className="rightPanel__title__user__image">
                        <img src="https://source.unsplash.com/random/50×50" alt="unsplash" />
                    </div>
                    <h6 className="rightPanel__title__user__name">HoangKhang0410</h6>
                </div>
                <FontAwesomeIcon icon={faCircleInfo} size="lg" cursor="pointer" />
            </div>
            <div className="rightPanel__conversation" ref={ref}>
                {data.map((item, index) => {
                    if (index % 2 === 0) {
                        return (
                            <div className="rightPanel__conversation__content mine" key={index}>
                                <p className="rightPanel__conversation__content__text mine">{item}</p>
                                <div className="rightPanel__conversation__content__options mine">
                                    <EmojiEmotionsOutlined onClick={handleClickEmoji} />
                                    <Reply />
                                    <MoreHoriz />
                                </div>
                                {/* <div
                                    className={`rightPanel__conversation__content__options__emojiPicker mine ${
                                        isOpenEmojiPicker ? 'active' : ''
                                    }`}
                                >
                                    <Picker />
                                </div> */}
                            </div>
                        );
                    } else {
                        return (
                            <div className="rightPanel__conversation__content yours" key={index}>
                                <div className="rightPanel__conversation__content__image">
                                    <img src="https://source.unsplash.com/random/50×50" alt="unsplash" />
                                </div>
                                <p className="rightPanel__conversation__content__text">{item}</p>
                                <div className="rightPanel__conversation__content__options">
                                    <EmojiEmotionsOutlined onClick={handleClickEmoji} />
                                    <Reply />
                                    <MoreHoriz />
                                </div>
                                {/* <div
                                    className={`rightPanel__conversation__content__options__emojiPicker ${
                                        isOpenEmojiPicker ? 'active' : ''
                                    }`}
                                >
                                    <Picker />
                                </div> */}
                            </div>
                        );
                    }
                })}
            </div>
            <div className="rightPanel__inputContainer">
                <FontAwesomeIcon
                    className="rightPanel__inputContainer__icon emoji"
                    icon={faFaceGrinWide}
                    size="lg"
                    cursor="pointer"
                />
                <input type="text" placeholder="Message..." value={text} onChange={handleChange} />
                {!isTyping ? (
                    <>
                        <FontAwesomeIcon
                            className="rightPanel__inputContainer__icon image"
                            icon={faImage}
                            size="lg"
                            cursor="pointer"
                        />
                        <FontAwesomeIcon
                            className="rightPanel__inputContainer__icon heart"
                            icon={faHeart}
                            size="lg"
                            cursor="pointer"
                        />
                    </>
                ) : (
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        size="lg"
                        cursor="pointer"
                        className="rightPanel__inputContainer__icon submit"
                        onClick={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatContent;
