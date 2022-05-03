import React, {useState} from 'react'
import { InsertEmoticonOutlined } from "@material-ui/icons";


import SettingModal from './settingModal'
import ChangePhoto from './changeProfilePhoto'
import FollowerModal from './followerModal';
import FollowingModal from './followingModal';

const UserHeader = () => {

    const [isShowSettingModal, setShowSettingModal] = useState(false)
    const [isShowChangePhoto, setShowChangePhoto] = useState(false)
    const [isShowFollowers, setShowFollowers] = useState(false)
    const [isShowFollowing, setShowFollowing] = useState(false)

    const closePopup = ()=>{
        setShowSettingModal(false)
        setShowChangePhoto(false)
        setShowFollowers(false)
        setShowFollowing(false)
    }
    console.log('show photo change', isShowChangePhoto);

  return (
    <div>
        <div className='header__container '>
            <div className="d-flex flex-row justify-content-center">
                <div className="p-2">
                    <div className='avata__container' onClick={() => { setShowChangePhoto(true) }}>
                        <img src='https://tophinhanh.com/wp-content/uploads/2022/01/anh-zenitsu-ngau-4k-564x375.jpg'></img>
                    </div>
                </div>
                <div className="p-2 ">
                    <div className="d-flex flex-column user__info " >
                        <div className="p-0 ">
                            <div className=''>
                                <div className="d-flex  flex-row ">
                                    <div className="p-2 username ">abcxyz_yangzi </div>
                                    <div className="p-2  span align-self-center">
                                        <button className='edit_button '>Edit profile </button>
                                    </div>
                                    <div className="p-2  span align-self-center">
                                        <InsertEmoticonOutlined onClick={() => { setShowSettingModal(true) }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-0 ">
                            <div className="d-flex  flex-row">
                                <div className="p-2 ">8 posts</div>
                                <div className="p-2" style={{cursor:'pointer'}} onClick={() =>{ setShowFollowers(true)} }>1  followers</div>
                                <div className="p-2" style={{cursor:'pointer'}}  onClick={() =>{ setShowFollowing(true)} } >10 folowing</div>
                            </div>
                        </div>
                        <div className="p-2">
                            <div>
                                TT
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>

        {isShowChangePhoto && <ChangePhoto handlePopup={ closePopup }/>}
        {isShowSettingModal && <SettingModal handlePopup={ closePopup } />}
        {isShowFollowers && <FollowerModal  handlePopup={ closePopup }/>}
        {isShowFollowing && <FollowingModal  handlePopup={ closePopup }/>}
    </div>
  )
}

export default UserHeader