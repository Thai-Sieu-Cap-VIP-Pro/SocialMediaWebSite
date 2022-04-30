import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faFaceGrinWide, faImage, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { EmojiEmotionsOutlined, Reply, MoreHoriz, InfoOutlined } from '@material-ui/icons';
import { createMessage, getMessageInCons } from '../ChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { checkText } from 'smile2emoji';
import Peer from 'simple-peer';
import Picker from 'emoji-picker-react';
import './Chat.scss';
import { socket } from '../pages/ChatPage';
import axios from 'axios';
import ChatSetting from './ChatSetting';

const ChatContent = () => {
    const [text, setText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
    const [image, setImage] = useState(null);
    const [data, setData] = useState([]);
    const [isOpenSetting, setIsOpenSetting] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.current);
    const params = useParams();
    // const [isShow, setIsShow] = useState(false);
    // const target = useRef(null);
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

    if (isOpenSetting) {
        return <ChatSetting setIsOpenSetting={setIsOpenSetting} />;
    } else {
        return (
            <div className="rightPanel">
                <div className="rightPanel__title">
                    <div className="rightPanel__title__user">
                        <div className="rightPanel__title__user__image">
                            <img src="https://source.unsplash.com/random/50×50" alt="unsplash" />
                        </div>
                        <h6 className="rightPanel__title__user__name">HoangKhang0410</h6>
                    </div>
                    <button>Call</button>
                    <InfoOutlined
                        fontSize="medium"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsOpenSetting(true)}
                    />
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

                {/* <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        zIndex: 997,
                    }}
                ></div> */}
            </div>
        );
    }
};

export default ChatContent;
