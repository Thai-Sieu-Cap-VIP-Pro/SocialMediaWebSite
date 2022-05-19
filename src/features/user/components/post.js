import React from 'react'

import { 
    InsertEmoticonOutlined,
    FavoriteBorderOutlined,
    AddCommentOutlined
 } from "@material-ui/icons";


import { useDispatch } from "react-redux";
import { ShowDetail, ShowReportModal } from "../../home/homeSlice";


const Post = ({post}) => {
    const dispatch = useDispatch();

    //hàm xử lý show phần comment khi show tất cả phần comment
    const showDetail = () => {
      console.log("Vào hàm Show chi tiết comment");
      const action = ShowDetail();
      dispatch(action);
    };
      
    
    return (
        <div className="post">
            <div className='post_container'>
                <img className='img' src={post?.images[0]} />
                <div className='overlay' onClick={showDetail}>
                    <div className='overlay__info' >
                        <span > <FavoriteBorderOutlined style={{color:'white'}}/> {post?.likes.length} </span> &ensp;
                        <span><    AddCommentOutlined /> {post?.comments.length}</span>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Post