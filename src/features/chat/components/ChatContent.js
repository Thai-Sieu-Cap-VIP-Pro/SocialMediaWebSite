import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinWide, faImage, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { InfoOutlined, Call } from '@material-ui/icons';
import { createMessage, getMessageInCons, tymMessage, unTymMessage } from '../ChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { checkText } from 'smile2emoji';
import { v1 as uuid } from 'uuid';
import './Chat.scss';
import Picker from 'emoji-picker-react';
import { socket } from '../pages/ChatPage';
import ChatSetting from './ChatSetting';
import ImagePopup from './ImagePopup';
import useImageUpload from '../../../hooks/useImageUpload';
import WarningPopup from '../../../shareComponents/WarningPopup/WarningPopup';
import Message from './Message';

const ChatContent = ({ isOpenSetting, setIsOpenSetting }) => {
    const [text, setText] = useState('');
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [openImagePopup, setOpenImagePopup] = useState(false);
    const conversations = useSelector((state) => state.chat.conversations);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [data, setData] = useState([]);
    const [srcPopup, setSrcPopup] = useState('');
    const [videoId, setVideoId] = useState(uuid());
    const [isCalling, setIsCalling] = useState(false);
    const currentUser = useSelector((state) => state.auth.current);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uploadImage = useImageUpload();

    const ref = useRef();

    // useEffect
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollTopMax;
        }
    }, [data, socket, image]);

    useEffect(() => {
        getMessagesInCons();
        setIsOpenSetting(false);
        setCurrentConversation(conversations.find((conversation) => conversation._id === params.id));
        return () => {
            socket.emit('leaveRoom', params.id);
        };
    }, [params.id]);

    useEffect(() => {
        socket.on('recieveMessage', (mess) => {
            setData((prev) => [...prev, mess]);
            console.log(mess);
        });
        return () => {
            socket.off('recieveMessage');
            console.log('client Off');
        };
    }, [socket]);

    useEffect(() => {
        socket.on('recieveTym', (mess) => {
            setData((prev) => {
                return prev.map((item) => {
                    if (item._id === mess._id) {
                        return mess;
                    }
                    return item;
                });
            });
        });
        return () => {
            socket.off('recieveTym');
            console.log('client Off');
        };
    }, [socket]);

    useEffect(() => {
        socket.on('recieveCalling', (videoId) => {
            setIsCalling(true);
            setVideoId(videoId);
        });
        return () => {
            socket.off('recieveCalling');
            console.log('End Call');
        };
    }, [socket]);

    const handleTymMessage = async (messageId, userId) => {
        try {
            const result = await dispatch(tymMessage({ messageId, userId })).unwrap();
            socket.emit('sendTym', result.newMessage);
        } catch (error) {
            throw error;
        }
    };

    const handleUnTymMessage = async (messageId, userId) => {
        try {
            const result = await dispatch(unTymMessage({ messageId, userId })).unwrap();
            socket.emit('sendTym', result.newMessage);
        } catch (error) {
            throw error;
        }
    };

    const getMessagesInCons = async () => {
        try {
            socket.emit('joinRoom', params.id);
            const result = await dispatch(getMessageInCons(params.id)).unwrap();
            //console.log(result.messages);
            setData(result.messages);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEmojiClick = (event, emojiObject) => {
        setText((a) => a + emojiObject.emoji);
        //setshowEmoji(false);
    };

    const handleChange = (e) => {
        if (!e.target.value) {
            setIsTyping(false);
            setText('');
        } else {
            setIsTyping(true);
            e.target.value = checkText(e.target.value);
            setText(e.target.value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            const result = await dispatch(createMessage({ content: text, conversationId: params.id })).unwrap();
            console.log(result);
            console.log(currentConversation)
            socket.emit('sendMessage', result.newMessage);
            socket.emit('sendNotice', currentConversation.members);
            setText('');
            setIsTyping(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileChange = async (e) => {
        setUploading(true);
        setImage(window.URL.createObjectURL(e.target.files[0]));
        const url = await uploadImage(e.target.files[0]);
        const result = await dispatch(
            createMessage({ content: url, conversationId: params.id, isImage: true })
        ).unwrap();
        setUploading(false);
        console.log(result);
        socket.emit('sendMessage', result.newMessage);
        socket.emit('sendNotice', currentConversation.members);
    };

    const handleImagePopup = (src) => {
        setSrcPopup(src);
        setOpenImagePopup(true);
    };

    const handleCall = () => {
        socket.emit('IamCalling', { members: currentConversation.members, videoId });
    };

    const handleAcceptCall = (id) => {
        navigate(`/video_call/${videoId}`);
    };
    const handleDeny = () => {
        setIsCalling(false);
    };

    if (isOpenSetting) {
        return <ChatSetting setIsOpenSetting={setIsOpenSetting} currentConversation={currentConversation} />;
    } else {
        return (
            <div className="rightPanel" style={{ position: 'relative' }}>
                <div className="rightPanel__title">
                    <div className="rightPanel__title__user">
                        <div className="rightPanel__title__user__image">
                            <img
                                src={
                                    currentConversation?.members.length === 2
                                        ? currentConversation?.members.find((item) => item._id !== currentUser._id)
                                              .avatar
                                        : 'https://res.cloudinary.com/wjbucloud/image/upload/v1651308420/j2team_girl_8_btpoep.jpg'
                                }
                                alt="unsplash"
                            />
                        </div>
                        <h6 className="rightPanel__title__user__name">
                            {conversations.find((conversation) => conversation._id === params.id)?.name
                            ? conversations.find((conversation) => conversation._id === params.id)?.name
                            : conversations.find((conversation) => conversation._id === params.id)?.members.length === 2
                                ? conversations
                                      .find((conversation) => conversation._id === params.id)
                                      ?.members.find((item) => item._id !== currentUser._id).name
                                : conversations.find((conversation) => conversation._id === params.id)?.members
                                      .length === 1
                                ? 'Không còn ai muốn trò chuyện với bạn nữa'
                                : conversations
                                      .find((conversation) => conversation._id === params.id)
                                      ?.members.filter((item) => item._id !== currentUser._id)
                                      .map((member) => member.name)
                                      .join(', ')}
                        </h6>
                    </div>
                    <div className="rightPanel__title__call">
                        <Link target="_blank" to={`/video_call/${videoId}`}>
                            <Call cursor="pointer" onClick={handleCall} />
                        </Link>
                    </div>
                    <InfoOutlined fontSize="medium" cursor="pointer" onClick={() => setIsOpenSetting(true)} />
                </div>
                <div className="rightPanel__conversation" ref={ref}>
                    {data.map((item, index) => {
                        console.log({ item });
                        return (
                            <Message
                                message={item}
                                key={index}
                                handleImagePopup={handleImagePopup}
                                handleTymMessage={handleTymMessage}
                                handleUnTymMessage={handleUnTymMessage}
                            />
                        );
                    })}
                    {uploading && (
                        <img
                            src={image}
                            alt="collections"
                            style={{ opacity: 0.5, maxWidth: '40%', alignSelf: 'flex-end', borderRadius: '10px' }}
                        />
                    )}
                </div>
                {showEmojiPicker && (
                    // <Picker
                    //     style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 990 }}
                    //     onEmojiClick={handleEmojiClick}
                    //     // pickerStyle={{
                    //     //     width: 'auto',
                    //     //     outerHeight: '100%',
                    //     //     innerHeight: '100px',
                    //     // }}
                    // ></Picker>
                    <div style={{ position: 'absolute', bottom: '60px', left: '20px', zIndex: 990 }}>
                        <Picker onEmojiClick={handleEmojiClick}></Picker>
                    </div>
                )}
                <div className="rightPanel__inputContainer">
                    <FontAwesomeIcon
                        className="rightPanel__inputContainer__icon emoji"
                        icon={faFaceGrinWide}
                        size="lg"
                        cursor="pointer"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />
                    <input
                        type="text"
                        placeholder="Message..."
                        value={text}
                        onChange={handleChange}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    {!isTyping ? (
                        <>
                            <label htmlFor="image-input" className="rightPanel__inputContainer__icon image">
                                <FontAwesomeIcon icon={faImage} size="lg" cursor="pointer" />
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
                {isCalling && (
                    <WarningPopup
                        title="Video Call"
                        content={`Ai đó đang muốn gọi cho bạn`}
                        handleOK={handleAcceptCall}
                        handleCANCEL={handleDeny}
                    />
                )}
                {openImagePopup && <ImagePopup src={srcPopup} setOpen={setOpenImagePopup} />}
            </div>
        );
    }
};

export default ChatContent;
