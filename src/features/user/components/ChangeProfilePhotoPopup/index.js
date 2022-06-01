import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useImageUpload from '../../../../hooks/useImageUpload';
import { updateAvt } from '../../profileSlice';



const ChangePhotoPopup = (props) => {
  const currentUser = useSelector((state) => state.auth.current);
  const uploadImage = useImageUpload();
  const dispatch = useDispatch();
  const handleFileChange = async (e)=>{
    const image = await uploadImage(e.target.files[0]);
    await dispatch(updateAvt({avatar: image}));
    props.setShowModal(false)
  }

  const handleCancle = () => {
    props.setShowModal(false)
  }

  return (
    <div className="report" >
      <div className="report__layout" onClick={props.handlePopup}></div>
      <div className="report__content">
        <ul>
          <li style={{padding:30 , fontWeight:700}}>Change Profile Photo</li>
          <li style={{color:'green'}}>
            <label  for='files' >
              <input type="file" id="files" onChange={handleFileChange}/> Update Photo 
            </label>
            </li>
          <li style={{color:'red'}}> Remove Current Photo</li>
          <li onClick={() => handleCancle()} style={{cursor:'pointer'}}>Cancel</li>
        </ul>
      </div>
    </div>
  )
}

export default ChangePhotoPopup