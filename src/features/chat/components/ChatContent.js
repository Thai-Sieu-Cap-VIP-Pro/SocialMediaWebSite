import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinWide, faImage, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { InfoOutlined, Call, ArrowDownward } from '@material-ui/icons';
import {
    createMessage,
    deleteMessage,
    getMessageInCons,
    seenAllMessages,
    seenMessage,
    tymMessage,
    unTymMessage,
} from '../ChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { checkText } from 'smile2emoji';
import { v1 as uuid } from 'uuid';
import './Chat.scss';
import Picker from 'emoji-picker-react';
import ChatSetting from './ChatSetting';
import ImagePopup from './ImagePopup';
import useImageUpload from '../../../hooks/useImageUpload';
import WarningPopup from '../../../shareComponents/WarningPopup/WarningPopup';
import Message from './Message';
import { socket } from '../../../App';
import useVideoUpload from '../../../hooks/useVideoUpload';

const ChatContent = ({ isOpenSetting, setIsOpenSetting, isShowPopup, setIsShowPopup }) => {
    const [text, setText] = useState('');
    const [uploading, setUploading] = useState(false);
    const [isFetchingMessages, setIsFetchingMessages] = useState(false);
    const [media, setMedia] = useState({ url: '', type: '' });
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
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [isEnough, setIsEnough] = useState(false);
    const [page, setPage] = useState(0);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uploadImage = useImageUpload();
    const uploadVideo = useVideoUpload();

    const ref = useRef();
    const chatContentRef = useRef();

    // useEffect

    useEffect(() => {
        document.title = 'Midori • Chats';
    }, []);

    // useEffect(() => {
    //     // chatContentRef.current.scrollTop = 10000000000;
    //     ref.current.scrollIntoView({ behavior: 'smooth' });
    // }, [currentConversation]);

    const handleScroll = async (e) => {
        if (e.target.scrollTop === 0) {
            if (!isEnough) {
                try {
                    const height1 = chatContentRef.current.scrollHeight;
                    console.log({ height1 });
                    setIsFetchingMessages(true);
                    const lmao = page + 1;
                    const result = await dispatch(getMessageInCons({ id: params.id, page: lmao })).unwrap();
                    const newMessages = await result.messages;
                    setIsFetchingMessages(false);
                    if (newMessages.length === 0) {
                        setIsEnough(true);
                    } else {
                        setData((prev) => {
                            return [...prev, ...newMessages];
                        });
                        setPage((prev) => prev + 1);
                    }
                    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight - height1;
                } catch (error) {
                    throw error;
                }
            }
        } else {
            if (
                chatContentRef.current.scrollHeight -
                    chatContentRef.current.scrollTop -
                    chatContentRef.current.clientHeight >
                300
            ) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        }
    };

    useEffect(() => {
        setIsEnough(false);
        seenAll();
        getMessagesInCons();
        setIsOpenSetting(false);
        setPage(0);
        setCurrentConversation(conversations.find((conversation) => conversation._id === params.id));
        socket.emit('sendNotice', [currentUser]);
        return () => {
            socket.emit('leaveRoom', params.id);
        };
    }, [params.id]);

    useEffect(() => {
        socket.on('recieveMessage', (mess) => {
            seenMess(mess._id);
            setData((prev) => [mess, ...prev]);
            if (
                chatContentRef.current.scrollHeight -
                    chatContentRef.current.scrollTop -
                    chatContentRef.current.clientHeight <=
                300
            ) {
                ref.current?.scrollIntoView({ behavior: 'smooth' });
            }
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

    useEffect(() => {
        socket.on('recieveDeleteMsg', (mess) => {
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
            socket.off('recieveDeleteMsg');
            console.log('client Off');
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
            const result = await dispatch(getMessageInCons({ id: params.id, page: 0 })).unwrap();
            //console.log(result.messages);
            setData(result.messages);
        } catch (error) {
            console.log(error);
        }
    };

    const seenAll = async () => {
        try {
            const result = await dispatch(seenAllMessages({ id: params.id })).unwrap();
            console.log('seen tin nhan');
        } catch (error) {
            console.log(error);
        }
    };

    const seenMess = async (id) => {
        try {
            console.log(id);
            const result = await dispatch(seenMessage({ messId: id })).unwrap();
            console.log(result.seenMessage);
            return result.seenMessage;
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
            const result = await dispatch(
                createMessage({ content: text, conversationId: params.id, userId: currentUser._id })
            ).unwrap();
            console.log(result);
            console.log(currentConversation);
            socket.emit('sendMessage', result.newMessage);
            socket.emit('sendNotice', currentConversation.members);
            setText('');
            setIsTyping(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteMessage = async (id) => {
        try {
            const result = await dispatch(deleteMessage({ id })).unwrap();
            console.log(result.deletedMessage);
            socket.emit('sendDeleteMsg', result.deletedMessage);
            socket.emit('sendNotice', conversations.find((conversation) => conversation._id === params.id)?.members);
        } catch (error) {
            throw error;
        }
    };

    const handleFileChange = async (e) => {
        if (e.target.files[0].size <= 52428800) {
            setUploading(true);
            if (e.target.files[0].type.includes('image')) {
                setMedia({ url: window.URL.createObjectURL(e.target.files[0]), type: 'image' });
                const url = await uploadImage(e.target.files[0]);
                const result = await dispatch(
                    createMessage({
                        content: url,
                        conversationId: params.id,
                        messType: 'image',
                        userId: currentUser._id,
                    })
                ).unwrap();
                socket.emit('sendMessage', result.newMessage);
                socket.emit('sendNotice', currentConversation.members);
            } else {
                setMedia({ url: window.URL.createObjectURL(e.target.files[0]), type: 'video' });
                const url = await uploadVideo(e.target.files[0]);
                const result = await dispatch(
                    createMessage({
                        content: url,
                        conversationId: params.id,
                        messType: 'video',
                        userId: currentUser._id,
                    })
                ).unwrap();
                socket.emit('sendMessage', result.newMessage);
                socket.emit('sendNotice', currentConversation.members);
            }
            setUploading(false);
        } else {
            alert('Kích thước của file quá lớn!');
        }
    };

    const handleImagePopup = (src) => {
        setSrcPopup(src);
        setOpenImagePopup(true);
    };

    const handleCall = () => {
        socket.emit('IamCalling', {
            members: currentConversation.members,
            videoId,
        });
    };

    const handleAcceptCall = (id) => {
        navigate(`/video_call/${videoId}`);
    };
    const handleDeny = () => {
        setIsCalling(false);
    };

    const handleScrollBottom = () => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
        setShowScrollButton(false);
    };

    // useEffect(() => {
    //     ref.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [handleFileChange, handleSubmit]);

    if (isOpenSetting) {
        return (
            <ChatSetting
                setIsOpenSetting={setIsOpenSetting}
                currentConversation={conversations.find((con) => con._id === params.id)}
            />
        );
    } else {
        return (
            <div className="rightPanel" style={{ position: 'relative' }}>
                <div className="rightPanel__title">
                    <div className="rightPanel__title__user">
                        <div className="rightPanel__title__user__image">
                            <img
                                src={
                                    conversations.find((conversation) => conversation._id === params.id)?.avatar
                                        ? conversations.find((conversation) => conversation._id === params.id)?.avatar
                                        : conversations.find((conversation) => conversation._id === params.id)?.members
                                              .length === 2
                                        ? conversations
                                              .find((conversation) => conversation._id === params.id)
                                              ?.members.find((item) => item._id !== currentUser._id).avatar
                                        : conversations.find((conversation) => conversation._id === params.id)?.members
                                              .length === 1
                                        ? 'https://res.cloudinary.com/wjbucloud/image/upload/v1653282748/haha_axj617.jpg'
                                        : 'https://res.cloudinary.com/wjbucloud/image/upload/v1651308420/j2team_girl_8_btpoep.jpg'
                                }
                                alt="unsplash"
                            />
                        </div>
                        <h6 className="rightPanel__title__user__name">
                            {conversations.find((conversation) => conversation._id === params.id)?.name
                                ? conversations.find((conversation) => conversation._id === params.id)?.name
                                : conversations.find((conversation) => conversation._id === params.id)?.members
                                      .length === 2
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
                <div className="rightPanel__conversation" ref={chatContentRef} onScroll={handleScroll}>
                    {isFetchingMessages && (
                        <img
                            src="https://res.cloudinary.com/wjbucloud/image/upload/v1653588935/Ball-Drop-Preloader-1-1_kvobub.gif"
                            style={{ width: '50px', height: 'auto', alignSelf: 'center' }}
                        ></img>
                    )}
                    {data
                        .slice(0)
                        .reverse()
                        .map((item, index) => {
                            return (
                                <Message
                                    message={item}
                                    key={index}
                                    handleImagePopup={handleImagePopup}
                                    handleTymMessage={handleTymMessage}
                                    handleUnTymMessage={handleUnTymMessage}
                                    handleDeleteMessage={handleDeleteMessage}
                                />
                            );
                        })}
                    {uploading ? (
                        media.type === 'image' ? (
                            <img
                                src={media.url}
                                alt="collections"
                                style={{
                                    opacity: 0.5,
                                    maxWidth: '40%',
                                    alignSelf: 'flex-end',
                                    borderRadius: '10px',
                                }}
                                loading="lazy"
                            />
                        ) : media.type === 'video' ? (
                            <video
                                src={media.url}
                                style={{
                                    opacity: 0.5,
                                    maxWidth: '40%',
                                    alignSelf: 'flex-end',
                                    borderRadius: '10px',
                                }}
                            ></video>
                        ) : null
                    ) : null}
                    {showScrollButton && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '100px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                borderRadius: '50%',
                                backgroundColor: '#EEEEEE',
                                cursor: 'pointer',
                                zIndex: 5,
                                padding: '5px',
                            }}
                            onClick={handleScrollBottom}
                        >
                            <ArrowDownward fontSize="large" htmlColor="#2BC891" />
                        </div>
                    )}
                    <div ref={ref} />
                </div>
                {showEmojiPicker && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '60px',
                            left: '20px',
                            zIndex: 990,
                        }}
                    >
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
                            <input
                                type="file"
                                id="image-input"
                                onChange={handleFileChange}
                                accept="image/*, video/mp4"
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
