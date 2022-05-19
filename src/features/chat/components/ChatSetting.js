import { Info } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import WarningPopup from '../../../shareComponents/WarningPopup/WarningPopup';
import { changeConversationName, deleteCon, removeUserInCon } from '../ChatSlice';
import { socket } from '../pages/ChatPage';
import ChatMember from './ChatMember';

const ChatSetting = ({ setIsOpenSetting, currentConversation }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.current);
    const [isClosePopup, setIsClosePopup] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [text, setText] = useState('');
    const handleDeleteCon = async () => {
        try {

            currentConversation.members.length > 1
                ? await dispatch(removeUserInCon({ conversationId: params.id, userId: currentUser._id }))
                      .unwrap()
                      .then((resultValue) => console.log(resultValue))
                      .catch((rejectedValue) => console.log(rejectedValue))
                : await dispatch(deleteCon({ conversationId: params.id }))
                      .unwrap()
                      .then((resultValue) => console.log(resultValue))
                      .catch((rejectedValue) => console.log(rejectedValue));
            await socket.emit('sendNotice', currentConversation.members);
            navigate('/messenger');
        } catch (error) {
            console.log({ error });
        }
    };

    const handleClosePopup = () => {
        setIsClosePopup(true);
    };
    const handleOpenPopup = () => {
        setIsClosePopup(false);
    };
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
            const result = await dispatch(changeConversationName({ id: params.id, newName: text })).unwrap();
            socket.emit('sendNotice', currentConversation.members);
            setText('');
            setIsTyping(false);
            setIsOpenSetting(false)
            
        } catch (error) {
            console.log(error);
        }
    };
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    return (
        <div className="rightPanel">
            <div className="rightPanel__titleSetting">
                <h4>Details</h4>
                <Info
                    fontSize="medium"
                    className="rightPanel__titleSetting__icon"
                    onClick={() => setIsOpenSetting(false)}
                />
            </div>
            <div className='rightPanel__changeName'>
                <p>Group Name: </p>
                <input
                        type="text"
                        placeholder="Add a name..."
                        value={text}
                        onChange={handleChange}
                        onKeyDown={(e) => handleKeyDown(e)}
                />
                {isTyping ? (
                        <button
                        onClick={handleSubmit}
                        >Done</button>
                ):(<></>)}
            </div>
            <div className="rightPanel__mainSetting">
                <div className="rightPanel__mainSetting__listMember">
                    <h4>Members</h4>
                    {currentConversation?.members.map((member) => {
                        return <ChatMember member={member} key={member._id} />;
                    })}
                </div>
                <div className="rightPanel__mainSetting__control">
                    <button className="rightPanel__mainSetting__control__button" onClick={handleOpenPopup}>
                        Delete Chat
                    </button>{' '}
                    <br />
                    <button className="rightPanel__mainSetting__control__button">Block</button> <br />
                    <button className="rightPanel__mainSetting__control__button">Report</button> <br />
                </div>
            </div>
            {!isClosePopup && (
                <WarningPopup
                    title="Xóa cuộc trò chuyện?"
                    content="Việc này sẽ khiến bạn và người khác không thể xem lại nội dung cuộc trò chuyện này nữa"
                    handleOK={handleDeleteCon}
                    handleCANCEL={handleClosePopup}
                />
            )}
        </div>
    );
};

export default ChatSetting;
