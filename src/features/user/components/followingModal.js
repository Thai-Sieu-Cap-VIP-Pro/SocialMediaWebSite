import React from 'react'
import FollowTag from './followTag'

const FollowingModal = (props) => {
    return (
        <div className="report" >
            <div className="report__layout" onClick={props.handlePopup}></div>
            <div className="report__content follow__modal">
                <ul>
                    <li>Following</li>
                    <li>
                        <FollowTag
                            src='https://gamek.mediacdn.vn/133514250583805952/2020/8/12/photo-5-15972058110651963614388.jpg'
                            name1='XiaoKeAi'
                            name2='YangZi'
                        />
                    </li>
                    <li>
                        <FollowTag
                            src='https://gamek.mediacdn.vn/133514250583805952/2020/8/12/photo-5-15972058110651963614388.jpg'
                            name1='XiaoKeAi'
                            name2='YangZi'
                        />
                    </li>
                    <li>
                        <FollowTag
                            src='https://gamek.mediacdn.vn/133514250583805952/2020/8/12/photo-5-15972058110651963614388.jpg'
                            name1='XiaoKeAi'
                            name2='YangZi'
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FollowingModal