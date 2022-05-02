import { Info } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import WarningPopup from '../../../shareComponents/WarningPopup/WarningPopup';
import { removeUserInCon } from '../ChatSlice';
import ChatMember from './ChatMember';

const ChatSetting = ({ setIsOpenSetting, currentConversation }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.current);
    const [isClosePopup, setIsClosePopup] = useState(true);
    const handleDeleteCon = async () => {
        try {
            await dispatch(removeUserInCon({ conversationId: params.id, userId: currentUser._id })).unwrap();
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
            <div className="rightPanel__mainSetting">
                <div className="rightPanel__mainSetting__listMember">
                    <h4>Members</h4>
                    {currentConversation?.members.map((member) => {
                        return <ChatMember member={member} />;
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
