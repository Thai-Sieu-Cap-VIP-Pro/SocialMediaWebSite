import React, {useState} from 'react'
import { InsertEmoticonOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';

import SettingModal from './settingModal'
import ChangePhoto from './changeProfilePhoto'
import FollowerModal from './followerModal';
import FollowingModal from './followingModal';

const UserHeader = () => {
    const currentUser = useSelector((state) => state.auth.current);
    const posts = useSelector((state) => state.user.userPosts)
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
    console.log(currentUser)

  return (
    <div>
        <div className='header__container '>
            <div className="d-flex flex-row justify-content-center">
                <div className="p-2">
                    <div className='avata__container' onClick={() => { setShowChangePhoto(true) }} >
                        <img src={currentUser.avatar}></img>
                    </div>
                </div>
                <div className="p-2 ">
                    <div className="d-flex flex-column user__info " >
                        <div className="p-0 ">
                            <div className=''>
                                <div className="d-flex  flex-row ">
                                    <p className="p-2 username ">{currentUser.name} </p>
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
                                <div className="p-2 ">{posts?.length} posts</div>
                                 <div className="p-2" style={{cursor:'pointer'}} onClick={() =>{ setShowFollowers(true)} }> {currentUser.followers.length}  followers</div>
                                <div className="p-2" style={{cursor:'pointer'}}  onClick={() =>{ setShowFollowing(true)} } >{currentUser.following.length} following</div>
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

        {isShowChangePhoto && <ChangePhoto setShowChangePhoto={setShowChangePhoto} handlePopup={ closePopup }/>}
        {isShowSettingModal && <SettingModal handlePopup={ closePopup } />}
        {isShowFollowers && <FollowerModal  handlePopup={ closePopup } followers={currentUser.followers}/>}
        {isShowFollowing && <FollowingModal  handlePopup={ closePopup } following={currentUser.following}/>}
    </div>
  )
}

export default UserHeader