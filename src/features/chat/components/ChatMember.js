import React from 'react';

const ChatMember = () => {
    return (
        <div className="rightPanel__mainSetting__listMember__member">
            <div className="rightPanel__mainSetting__listMember__member__image">
                <img src="https://source.unsplash.com/random/50×50" alt="unsplash" />
            </div>
            <div className="rightPanel__mainSetting__listMember__member__info">
                <h6 className="rightPanel__mainSetting__listMember__member__info__name">username</h6>
                <h6 className="rightPanel__mainSetting__listMember__member__info__email">email</h6>
            </div>
        </div>
    );
};

export default ChatMember;
