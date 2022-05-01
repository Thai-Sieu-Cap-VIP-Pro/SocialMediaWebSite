import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinWide, faImage, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { Reply, InfoOutlined, FavoriteBorder, Favorite, DeleteOutline, Call } from '@material-ui/icons';
import { createMessage, getMessageInCons } from '../ChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { checkText } from 'smile2emoji';
// import Peer from 'simple-peer';
// import Picker from 'emoji-picker-react';
import './Chat.scss';
import { socket } from '../pages/ChatPage';
import axios from 'axios';
import ChatSetting from './ChatSetting';
import ImagePopup from './ImagePopup';
import useImageUpload from '../../../hooks/useImageUpload';

const ChatContent = ({ isOpenSetting, setIsOpenSetting }) => {
    const [text, setText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
    const [openImagePopup, setOpenImagePopup] = useState(false);
    const conversations = useSelector((state) => state.chat.conversations);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [data, setData] = useState([]);
    const [isTymMsg, setIsTymMsg] = useState(false);
    const [srcPopup, setSrcPopup] = useState('');
    const currentUser = useSelector((state) => state.auth.current);
    const params = useParams();
    const dispatch = useDispatch();
    const uploadImage = useImageUpload();

    const ref = useRef();
    // dummy thingssssssssssssssssssssssss

    // const [me, setMe] = useState('');
    // const [stream, setStream] = useState();
    // const [receivingCall, setReceivingCall] = useState(false);
    // const [caller, setCaller] = useState('');
    // const [callerSignal, setCallerSignal] = useState();
    // const [callAccepted, setCallAccepted] = useState(false);
    // const [idToCall, setIdToCall] = useState('');
    // const [callEnded, setCallEnded] = useState(false);
    // const [name, setName] = useState('');
    // const myVideo = useRef();
    // const userVideo = useRef();
    // const connectionRef = useRef();

    // useEffect(() => {
    //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    //         setStream(stream);
    //         myVideo.current.srcObject = stream;
    //         console.log(myVideo.current.srcObject);
    //         // console.log(stream);
    //     });

    //     socket.on('me', (id) => {
    //         setMe(currentUser._id);
    //     });

    //     socket.on('callUser', (data) => {
    //         setReceivingCall(true);
    //         setCaller(data.from);
    //         setName(data.name);
    //         setCallerSignal(data.signal);
    //     });
    // }, []);

    // const callUser = (id) => {
    //     const peer = new Peer({
    //         initiator: true,
    //         trickle: false,
    //         stream: stream,
    //     });
    //     peer.on('signal', (data) => {
    //         socket.emit('callUser', {
    //             userToCall: id,
    //             signalData: data,
    //             from: me,
    //             name: name,
    //         });
    //     });
    //     peer.on('stream', (stream) => {
    //         userVideo.current.srcObject = stream;
    //     });
    //     socket.on('callAccepted', (signal) => {
    //         setCallAccepted(true);
    //         peer.signal(signal);
    //     });

    //     connectionRef.current = peer;
    // };

    // const answerCall = () => {
    //     setCallAccepted(true);
    //     const peer = new Peer({
    //         initiator: false,
    //         trickle: false,
    //         stream: stream,
    //     });
    //     peer.on('signal', (data) => {
    //         socket.emit('answerCall', { signal: data, to: caller });
    //     });
    //     peer.on('stream', (stream) => {
    //         userVideo.current.srcObject = stream;
    //     });

    //     peer.signal(callerSignal);
    //     connectionRef.current = peer;
    // };

    // const leaveCall = () => {
    //     setCallEnded(true);
    //     connectionRef.current.destroy();
    // };

    // sndbjsahdjasbdjbasjdbasjdbjasbdjsabdjsbdjbasjdbjas

    const handleClickEmoji = () => {
        setIsOpenEmojiPicker(!isOpenEmojiPicker);
    };

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
        setCurrentConversation(conversations.find((conversation) => conversation._id === params.id));
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
            socket.emit('sendMessage', result.newMessage);
            setText('');
            setIsTyping(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileChange = async (e) => {
        const url = await uploadImage(e.target.files[0]);
        const result = await dispatch(
            createMessage({ content: url, conversationId: params.id, isImage: true })
        ).unwrap();
        console.log(result);
        socket.emit('sendMessage', result.newMessage);
    };

    const handleImagePopup = (src) => {
        setSrcPopup(src);
        setOpenImagePopup(true);
    };

    if (isOpenSetting) {
        return <ChatSetting setIsOpenSetting={setIsOpenSetting} currentConversation={currentConversation} />;
    } else {
        return (
            <div className="rightPanel">
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
                            {currentConversation?.members.length === 2
                                ? currentConversation?.members.find((item) => item._id !== currentUser._id).name
                                : currentConversation?.members
                                      .filter((item) => item._id !== currentUser._id)
                                      .map((member) => member.name)
                                      .join(', ')}
                        </h6>
                    </div>
                    <div className="rightPanel__title__call">
                        <Call cursor="pointer" />
                    </div>
                    <InfoOutlined fontSize="medium" cursor="pointer" onClick={() => setIsOpenSetting(true)} />
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
                                        <img src={item.sender.avatar} alt="unsplash" />
                                    </div>
                                )}
                                {item.content.isImage === true ? (
                                    <img
                                        src={item.content.text}
                                        alt="pictureChat"
                                        className="rightPanel__conversation__content__textImage"
                                        onClick={() => handleImagePopup(item.content.text)}
                                    />
                                ) : (
                                    <p
                                        className={`rightPanel__conversation__content__text ${
                                            item.sender._id === currentUser._id ? 'mine' : ''
                                        }`}
                                    >
                                        {item.content.text}
                                    </p>
                                )}
                                {isTymMsg && (
                                    <div
                                        className={`rightPanel__conversation__content__react ${
                                            item.sender._id === currentUser._id ? 'mine' : ''
                                        }`}
                                    >
                                        <Favorite
                                            htmlColor="red"
                                            fontSize="small"
                                            className="rightPanel__conversation__content__react__tym"
                                        />
                                    </div>
                                )}

                                <div
                                    className={`rightPanel__conversation__content__options ${
                                        item.sender._id === currentUser._id ? 'mine' : ''
                                    }`}
                                >
                                    {!isTymMsg ? (
                                        <FavoriteBorder onClick={() => setIsTymMsg(true)} />
                                    ) : (
                                        <Favorite htmlColor="red" onClick={() => setIsTymMsg(false)} />
                                    )}
                                    <Reply />
                                    <DeleteOutline />
                                </div>
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

                {openImagePopup && <ImagePopup src={srcPopup} setOpen={setOpenImagePopup} />}
            </div>
        );
    }
};

export default ChatContent;
