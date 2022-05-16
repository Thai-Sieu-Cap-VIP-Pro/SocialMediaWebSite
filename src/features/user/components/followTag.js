import React from 'react'
import IMAGES from "../../../assets/images/imageStore";


const FollowTag = (props) => {
    return (
        <div>
                <div className="follow__tag">
                    <img src={props.src} alt="" />
                    <div className="follow__tag__name">
                        <p>{props.name1}</p>
                        <p>{props.name2}</p>
                    </div>
                    <div className="follow__tag__button">
                        <button>remove</button>
                    </div>
                </div>
        </div>
    )
}

export default FollowTag