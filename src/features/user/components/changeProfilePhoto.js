import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useImageUpload from '../../../hooks/useImageUpload'
import { changeAvatar } from '../userSlice';


const ChangePhoto = (props) => {
  const currentUser = useSelector((state) => state.auth.current);
  const urlImg = useImageUpload();
  const dispatch = useDispatch();
  const handleFileChange = async (e)=>{
    console.log('alo');
    const url = await urlImg(e.target.files[0])
    console.log(url);
    console.log('alo');
    dispatch(changeAvatar({newAvt: url})).then((resultValue)=>{}).catch((rejectedValue)=>console.log(rejectedValue));
    props.setShowChangePhoto(false)
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
          <li onClick={props.handlePopup} style={{cursor:'pointer'}}>Cancel</li>
        </ul>
      </div>
    </div>
  )
}

export default ChangePhoto