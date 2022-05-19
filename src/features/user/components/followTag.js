import React from 'react'
import IMAGES from "../../../assets/images/imageStore";


const FollowTag = ({user}) => {
    return (
        <div>
                <div className="follow__tag">
                    <img src={user.avatar} alt="" />
                    <div className="follow__tag__name">
                        <p>{user.name}</p>
                    </div>
                    <div className="follow__tag__button">
                        <button>remove</button>
                    </div>
                </div>
        </div>
    )
}

export default FollowTag