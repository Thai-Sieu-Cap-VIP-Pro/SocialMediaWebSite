import Post from "./post";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getUserPosts } from "../userSlice";
import { useParams } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.user.userPosts)
  const param = useParams()

  useEffect(() => {
    dispatch(getUserPosts(param.id))
      .unwrap()
      .then((resultValue) => console.log(resultValue))
      .catch((rejectedValue) => console.log(rejectedValue));
  },[]);

  console.log(posts)

  return (
    <div className="container img_gallery">
      <div className="posts flex-wrap">
        {/* <Post src="https://tophinhanh.com/wp-content/uploads/2022/01/anh-zenitsu-ngau-4k-564x375.jpg" />
        <Post src="https://tophinhanh.com/wp-content/uploads/2022/01/anh-zenitsu-ngau-4k-564x375.jpg" />
        <Post src="https://tophinhanh.com/wp-content/uploads/2022/01/anh-zenitsu-ngau-4k-564x375.jpg" />
        <Post src="https://tophinhanh.com/wp-content/uploads/2022/01/anh-zenitsu-ngau-4k-564x375.jpg" /> */}
        {posts?.map((item) => {
          return(
            <Post key={item._id} post={item} />
          )
        })}
      </div>
    </div>
  );
};

export default Posts;
