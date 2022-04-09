import React from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const param = useParams();
  return <div>Đây là trang post{param.postid}</div>;
};

export default Post;
