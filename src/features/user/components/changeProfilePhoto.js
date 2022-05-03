import React from 'react'

const ChangePhoto = (props) => {
  return (
    <div className="report" >
      <div className="report__layout" onClick={props.handlePopup}></div>
      <div className="report__content">
        <ul>
          <li style={{padding:30 , fontWeight:700}}>Change Profile Photo</li>
          <li style={{color:'green'}}>
            <label  for='files' >
              <input type="file" id="files"/> Update Photo 
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