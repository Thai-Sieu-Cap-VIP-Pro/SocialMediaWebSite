import React from 'react'

import { 
    InsertEmoticonOutlined,
    FavoriteBorderOutlined,
    AddCommentOutlined
 } from "@material-ui/icons";


import { useDispatch } from "react-redux";
import { ShowDetail, ShowReportModal } from "../../home/homeSlice";


const Post = (props) => {
    const dispatch = useDispatch();

    //hàm xử lý show phần comment khi show tất cả phần comment
    const showDetail = () => {
      console.log("Vào hàm Show chi tiết comment");
      const action = ShowDetail();
      dispatch(action);
    };
      
    
    return (
        <div class="post">
            <div className='post_container'>
                <img className='img' src={props.src} />
                <div className='overlay' onClick={showDetail}>
                    <div className='overlay__info' >
                        <span > <FavoriteBorderOutlined style={{color:'white'}}/> 20 </span> &ensp;
                        <span><    AddCommentOutlined /> 20</span>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Post