import React from 'react'

import FollowTag from './followTag'

const FollowerModal = (props) => {
    return (
        <div><div className="report" >
            <div className="report__layout" onClick={props.handlePopup}></div>
            <div className="report__content follow__modal">
                <ul>
                    <li>Followers</li>
                    <li>
                        <FollowTag 
                            src='https://tophinhanh.com/wp-content/uploads/2022/01/anh-zenitsu-ngau-4k-564x375.jpg'
                            name1='TT_105'
                            name2='thanhtuyen'
                        />
                    </li>
                    <li>
                        <FollowTag 
                            src='https://tophinhanh.com/wp-content/uploads/2022/01/anh-zenitsu-ngau-4k-564x375.jpg'
                            name1='TT_105'
                            name2='thanhtuyen'
                        />
                    </li>
                    <li>
                        <FollowTag 
                            src='https://tophinhanh.com/wp-content/uploads/2022/01/anh-zenitsu-ngau-4k-564x375.jpg'
                            name1='TT_105'
                            name2='thanhtuyen'
                        />
                    </li>
                </ul>
            </div>
        </div></div>
    )
}

export default FollowerModal