import { Info } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatMember from './ChatMember';

const ChatSetting = ({ setIsOpenSetting }) => {
    const params = useParams();
    const conversation = useSelector((state) =>
        state.chat.conversations.filter((conversation) => conversation._id === params.id)
    );
    console.log(conversation);
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
                    <ChatMember />
                </div>
                <div className="rightPanel__mainSetting__control">
                    <button className="rightPanel__mainSetting__control__button">Delete Chat</button> <br />
                    <button className="rightPanel__mainSetting__control__button">Block</button> <br />
                    <button className="rightPanel__mainSetting__control__button">Report</button> <br />
                </div>
            </div>
        </div>
    );
};

export default ChatSetting;
