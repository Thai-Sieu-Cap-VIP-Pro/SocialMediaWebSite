import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faFaceGrinWide, faImage, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { EmojiEmotionsOutlined, Reply, MoreHoriz } from '@material-ui/icons';
import { createMessage, getMessageInCons } from '../ChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Picker from 'emoji-picker-react';
import './Chat.scss';
import { socket } from '../pages/ChatPage';
import axios from 'axios';

const ChatContent = () => {
    const [text, setText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
    const [image, setImage] = useState(null);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.current);
    const params = useParams();
    // const [isShow, setIsShow] = useState(false);
    // const target = useRef(null);
    const ref = useRef();

    const handleClickEmoji = () => {
        setIsOpenEmojiPicker(!isOpenEmojiPicker);
    };

    useEffect(() => {
        socket.on('recieveMessage', (mess) => {
            setData((prev) => [...prev, mess]);
            console.log(mess.conversationId);
        });
        return () => {
            socket.off('recieveMessage');
            console.log('client Off');
        };
    }, [socket]);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [data, socket]);

    const getMessagesInCons = async () => {
        try {
            socket.emit('joinRoom', params.id);
            const result = await dispatch(getMessageInCons(params.id)).unwrap();
            console.log(result.messages);
            setData(result.messages);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMessagesInCons();
        return () => {
            socket.emit('leaveRoom', params.id);
        };
    }, [params.id]);

    const handleChange = (e) => {
        if (!e.target.value) {
            setIsTyping(false);
            setText('');
        } else {
            setIsTyping(true);
            setText(e.target.value);
        }
    };
    const handleSubmit = async () => {
        try {
            const result = await dispatch(createMessage({ content: text, conversationId: params.id })).unwrap();
            console.log(result);
            socket.emit('sendMessage', result.newMessage);
            setText('');
            setIsTyping(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileChange = async (e) => {
        setImage(e.target.files[0]);
        const imageData = new FormData();
        imageData.append('api_key', '711435673899525');
        imageData.append('file', image);
        imageData.append('upload_preset', 'socialnetwork');
        imageData.append('cloud_name', 'wjbucloud');
        const url = (
            await axios.post('https://api.cloudinary.com/v1_1/wjbucloud/image/upload', imageData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
        ).data.url;
        const result = await dispatch(
            createMessage({ content: url, conversationId: params.id, isImage: true })
        ).unwrap();
        console.log(result);
        socket.emit('sendMessage', result.newMessage);
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
                    return (
                        <div
                            className={`rightPanel__conversation__content ${
                                item.sender._id === currentUser._id ? 'mine' : ''
                            }`}
                            key={index}
                        >
                            {item.sender._id !== currentUser._id && (
                                <div className="rightPanel__conversation__content__image">
                                    <img src="https://source.unsplash.com/random/50×50" alt="unsplash" />
                                </div>
                            )}
                            {item.content.isImage === true ? (
                                <img src={item.content.text} alt="hình" style={{ width: '50px' }} />
                            ) : (
                                <p
                                    className={`rightPanel__conversation__content__text ${
                                        item.sender._id === currentUser._id ? 'mine' : ''
                                    }`}
                                >
                                    {item.content}
                                </p>
                            )}

                            <div
                                className={`rightPanel__conversation__content__options ${
                                    item.sender._id === currentUser._id ? 'mine' : ''
                                }`}
                            >
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
                        <label htmlFor="image-input">
                            <FontAwesomeIcon
                                className="rightPanel__inputContainer__icon image"
                                icon={faImage}
                                size="lg"
                                cursor="pointer"
                            />
                        </label>
                        <input type="file" id="image-input" onChange={handleFileChange} />
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
